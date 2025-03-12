import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator" 
import { IsEmailUnique } from "../validators/is-email-unique.validator"


export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @IsEmailUnique({ message: "Este email ya está registrado" }) // Personaliza el mensaje
  email: string  

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsPhoneNumber()
  contactPhone: string

  @IsArray()
  @IsString({ each: true }) // Asegura que cada elemento es un string (IDs de roles)
  roles: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  educations?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experience?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ratings?: string[]

  @IsOptional()
  @IsString()
  avatar?: string
}
