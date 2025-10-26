import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { MongoModule } from './services/mongo/mongo.module';
import { ConfigModule } from '@nestjs/config';
import { ReturnJsonService } from './services/returnJson/returnJson.service';
import { ReturnJsonModule } from './services/returnJson/returnJson.module';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    ApiModule,
    MongoModule,
    ReturnJsonModule,
    ConfigModule.forRoot({
      envFilePath: 'development.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [ReturnJsonService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('/*path');
    consumer.apply(AuthMiddleware).forRoutes('/*path');
  }
}
