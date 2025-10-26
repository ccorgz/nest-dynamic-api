import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiService } from './api.service';
import { jsonResponse } from 'src/utils/jsonResponse';

@Controller('v1')
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

  @Get('/*all')
  async runCommand(@Param('all') all: string[], @Res() res: Response) {
    const toUseMethodUrl = `/${all?.join('/')}`;
    const result = await this.apiService.runCommand(toUseMethodUrl);
    return jsonResponse(res, result);
  }
}
