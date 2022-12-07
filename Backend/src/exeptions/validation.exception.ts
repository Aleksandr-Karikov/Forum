import { HttpException, HttpStatus } from '@nestjs/common';
import { Error } from '@common';

export class ValidationException extends HttpException {
    constructor(response: Error) {
        super({ errors: response }, HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
    messages: Error;
}
