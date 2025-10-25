import { Module, Global } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { MongoService } from './mongo.service';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_CLIENT',
      useFactory: async () => {
        const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_URL}/?appName=${process.env.MONGO_DB_NAME}`;
        const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
        });
        await client.connect();
        console.log('Connected to MongoDB Atlas!');
        return client;
      },
    },
    MongoService,
  ],
  exports: ['MONGO_CLIENT', MongoService],
})
export class MongoModule {}
