import { Module, Global } from '@nestjs/common';
import { ReturnJsonService } from './returnJson.service';

@Global()
@Module({
  providers: [ReturnJsonService],
  exports: [ReturnJsonService],
})
export class ReturnJsonModule {}
