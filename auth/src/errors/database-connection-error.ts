import { CustomError } from './custom-error';
import { SerializedErrors } from './error-types';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  SerializedErrors(): SerializedErrors[] {
    return [{ message: this.reason }];
  }
}
