import { Injectable } from '@nestjs/common';
import NotFoundException from './exceptions/NotFoundException';

@Injectable()
export class AppService {
  getRoot(): never {
    return NotFoundException();
  }
}
