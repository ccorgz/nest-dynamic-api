export class MainResponse {
  statusCode: number;
  statusText: 'success' | 'error';
  statusMessage: string;
  data?: unknown;

  constructor(init?: Partial<MainResponse>) {
    this.statusCode = init?.statusCode ?? 200;
    this.statusText = init?.statusText ?? 'success';
    this.statusMessage = init?.statusMessage ?? 'success';
    this.data = init?.data;
  }
}
