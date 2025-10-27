import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiService } from './api.service';
import { jsonResponse } from 'src/utils/jsonResponse';

@Controller('v1')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/*all')
  async runCommand(@Param('all') all: string[], @Res() res: Response) {
    const toUseMethodUrl = `/${all?.join('/')}`;
    const result = await this.apiService.runCommand(toUseMethodUrl);
    return jsonResponse(res, result);
  }
}
