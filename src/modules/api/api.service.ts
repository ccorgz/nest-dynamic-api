import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/services/mongo/mongo.service';
import { ReturnJsonService } from 'src/services/returnJson/returnJson.service';

@Injectable()
export class ApiService {
  constructor(
    private readonly mongoService: MongoService,
    private readonly returnJsonService: ReturnJsonService,
  ) {}

  async findAll() {
    const db = this.mongoService.getDb('sample_mflix');
    const users = await db.collection('users').find().toArray();
    console.log('users :', users);
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }

  async runCommand(methodPath: string) {
    const baseQuery = await this.mongoService
      .getDb('dynamic-db')
      .collection('api')
      .findOne({ path: methodPath });

    if (baseQuery?.active == false) {
      return this.returnJsonService.error.notFound(null);
    }

    return baseQuery
      ? this.returnJsonService.success(baseQuery)
      : this.returnJsonService.error.notFound('Method Not Found');
  }
}
