import { CustomError } from './custom-error';
import { SerializedErrors } from './error-types';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  SerializedErrors(): SerializedErrors[] {
    return [{ message: 'Not Found' }];
  }
}
