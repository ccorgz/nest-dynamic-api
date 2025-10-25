import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class MongoService implements OnModuleDestroy {
  constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {}

  getDb(dbName: string): Db {
    return this.client.db(dbName);
  }

  async onModuleDestroy() {
    await this.client.close();
    console.log('MongoDB connection closed.');
  }
}
