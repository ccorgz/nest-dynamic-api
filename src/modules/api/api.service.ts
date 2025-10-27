import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/services/mongo/mongo.service';
import { ReturnJsonService } from 'src/services/returnJson/returnJson.service';

@Injectable()
export class ApiService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly returnJsonService: ReturnJsonService,
  ) {}

  async runCommand(methodPath: string) {
    const baseMethod = await this.mongoService
      .getDb('dynamic-db')
      .collection('api')
      .findOne({ path: methodPath });

    if (baseMethod?.active == false) {
      return this.returnJsonService.error.notFound(null);
    }
    if (baseMethod?.query == '' || !baseMethod?.query) {
      return this.returnJsonService.error.internal(
        null,
        'Invalid Method. No Query Defined',
      );
    }

    type FilterValue =
      | string
      | number
      | boolean
      | Array<string | number | boolean>;
    type Filters = Record<string, { [op: string]: FilterValue }>;

    const filters: Filters = {};

    if (baseMethod?.query && typeof baseMethod.query === 'string') {
      for (const f of baseMethod.query.split(',')) {
        const parts = f.split(':');
        if (parts.length !== 3) continue;

        const [field, op, rawValue] = parts;
        if (!field || !op) continue;

        const value =
          rawValue === 'true'
            ? true
            : rawValue === 'false'
              ? false
              : !isNaN(Number(rawValue))
                ? Number(rawValue)
                : rawValue;

        filters[field] = { [`$${op}`]: value };
      }
    }

    const result = await this.mongoService
      .getDb('dynamic-db')
      .collection('api')
      .find(filters)
      .toArray();

    return result
      ? this.returnJsonService.success(result)
      : this.returnJsonService.error.notFound([], 'No Data Could Be Retrieved');
  }
}
