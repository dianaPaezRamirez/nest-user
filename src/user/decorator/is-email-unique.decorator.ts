import { registerDecorator } from "class-validator";
import { IsEmailUniqueConstraint } from "../validators/is-email-unique.validator";

// Decorador reutilizable para la validación
export function IsEmailUnique() {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: { message: "Email already exists" },
        constraints: [],
        validator: IsEmailUniqueConstraint,
      });
    };
  }