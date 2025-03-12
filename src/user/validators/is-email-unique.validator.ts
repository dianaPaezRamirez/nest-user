import { Injectable, BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string): Promise<boolean> {
   
    if (!this.prisma) {
      console.error('❌ PrismaService no está disponible');
      return false;
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: [
          {
            field: 'email',
            constraints: ['El email ya está registrado'],
          },
        ],
      });
    }

    return true;
  }

  defaultMessage(): string {
    return 'El email ya está registrado.';
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}
