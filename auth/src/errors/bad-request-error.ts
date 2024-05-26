import { CustomError } from './custom-error';
import { SerializedErrors } from './error-types';

export class BadRequestError extends CustomError {
  statusCode = 400;


  constructor(public errorMessage: string) {
    super(errorMessage);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  SerializedErrors(): SerializedErrors[] {
    return [{ message: this.errorMessage}]
  }
}
