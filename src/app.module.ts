import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './modules/api/api.module';
import { MongoModule } from './services/mongo/mongo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ApiModule,
    MongoModule,
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
