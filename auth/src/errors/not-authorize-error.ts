import { CustomError } from "./custom-error";
import { SerializedErrors } from "./error-types";

export class NotAuthorizedError extends CustomError{
    statusCode = 401

    constructor(){
        super('Not authorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    SerializedErrors(): SerializedErrors[] {
        return [{message: 'Not authorized'}]
    }
}