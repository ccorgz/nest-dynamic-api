import { Response } from 'express';
import { MainResponse } from 'src/models/common/index.model';

export const jsonResponse = (res: Response, data: MainResponse) => {
  res.status(data?.statusCode ?? 200).json(data);
};
