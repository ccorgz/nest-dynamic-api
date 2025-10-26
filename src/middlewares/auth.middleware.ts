import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ReturnJsonService } from 'src/services/returnJson/returnJson.service';
import { jsonResponse } from 'src/utils/jsonResponse';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly returnJsonService: ReturnJsonService) {}

  private readonly USER = 'admin';
  private readonly PASS = 'admin';

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return res.status(401).send('Unauthorized');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');

    if (username !== this.USER || password !== this.PASS) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      return jsonResponse(res, this.returnJsonService.error.unauthorized(null));
    }

    next();
  }
}
