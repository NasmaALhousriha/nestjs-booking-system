import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello nasma';
  }

  postHello(name:string): string {
    return 'hello ' + name;
  }
}
