import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  @Get()
  findAll() {
    return this.apiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiService.findOne(+id);
  }
}
