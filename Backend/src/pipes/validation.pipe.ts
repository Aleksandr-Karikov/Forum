import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'exeptions/validation.exception';
import { Error } from '@common';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: object, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        if (!obj) {
            return value;
        }
        const errors = await validate(obj);
        const errorObj: Error = {};

        if (errors.length) {
            errors.forEach((err) => {
                errorObj[err.property] = Object.values(err.constraints);
                return errorObj;
            });
            throw new ValidationException(errorObj);
        }
        return value;
    }
}
