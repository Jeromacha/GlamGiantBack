import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenidos a GlamGiant INC 👽👽👽';
  }
}
