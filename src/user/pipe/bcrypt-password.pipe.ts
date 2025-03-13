import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class bcryptPasswordd implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value.password) {
        throw new BadRequestException('El campo "password" es requerido.');
      }
  
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(value.password, salt);
    return {...value,password:hash};
  }
}
