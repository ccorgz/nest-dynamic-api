import { Injectable } from '@nestjs/common';
import { MainResponse } from 'src/models/common/index.model';

@Injectable()
export class ReturnJsonService {
  success = Object.assign(
    <T>(data: T, customStatusMessage?: string) =>
      new MainResponse({
        statusCode: 200,
        statusText: 'success',
        statusMessage: customStatusMessage ?? 'OK',
        data: data,
      }),
    {
      created: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 201,
          statusText: 'success',
          statusMessage: customStatusMessage ?? 'Resource Created',
          data: data,
        }),
      updated: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 202,
          statusText: 'success',
          statusMessage: customStatusMessage ?? 'Resource Updated',
          data: data,
        }),
      deleted: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 202,
          statusText: 'success',
          statusMessage: customStatusMessage ?? 'Resource Deleted',
          data: data,
        }),
      empty: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 200,
          statusText: 'success',
          statusMessage: customStatusMessage ?? 'No Data Could Be Listed',
          data: data,
        }),
    },
  );

  error = Object.assign(
    <T>(data: T, customStatusMessage?: string) =>
      new MainResponse({
        statusCode: 400,
        statusText: 'error',
        statusMessage: customStatusMessage ?? 'Bad Request',
        data: data,
      }),
    {
      unauthorized: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 401,
          statusText: 'error',
          statusMessage: customStatusMessage ?? 'Unauthorized',
          data: data,
        }),
      notFound: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 404,
          statusText: 'error',
          statusMessage: customStatusMessage ?? 'Not Found',
          data: data,
        }),
      notAllowed: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 405,
          statusText: 'error',
          statusMessage: customStatusMessage ?? 'Method Not Allowed',
        }),
      internal: <T>(data: T, customStatusMessage?: string) =>
        new MainResponse({
          statusCode: 500,
          statusText: 'error',
          statusMessage: customStatusMessage ?? 'Internal Server Error',
          data: data,
        }),
    },
  );
}
