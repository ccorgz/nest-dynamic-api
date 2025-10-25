import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/services/mongo/mongo.service';

@Injectable()
export class ApiService {
  constructor(private readonly mongoService: MongoService) {}

  async findAll() {
    const db = this.mongoService.getDb('sample_mflix');
    const users = await db.collection('users').find().toArray();
    console.log('users :', users);
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }
}
