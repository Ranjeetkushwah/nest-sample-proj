import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomService {
  getCustom(): string {
    return 'Hello from custom!';
  }
}
