import { NotFoundException } from '@nestjs/common';
import { message, notFoundDefaultMessage } from './message';

export default (message: message = notFoundDefaultMessage): never => {
  throw new NotFoundException(message);
};
