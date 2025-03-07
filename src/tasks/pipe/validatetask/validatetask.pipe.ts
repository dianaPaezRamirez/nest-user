import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatetaskPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valueNumber= parseInt(value.number.toString(),10) 

    if(isNaN(valueNumber)){
        throw new HttpException("number must be a number",HttpStatus.BAD_REQUEST)
    }

    return {...value,number:valueNumber};
  }
}
