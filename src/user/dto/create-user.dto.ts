import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator" 
import { IsEmailUnique } from "../validators/is-email-unique.validator"
import { ExperienceDto } from "./experience.dto"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"


export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @IsEmailUnique({ message: "Este email ya está registrado" }) // Personaliza el mensaje
  @ApiProperty({
    description: 'User email',
    example: 'email@mail.com',
  })
  email: string  

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User name',
    example: 'Jhon',
  })
  name: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  lastName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password: string

  @IsPhoneNumber()
  @ApiProperty({
    description: 'User phone',
    example: '+573001234567',
  })
  contactPhone: string

  @IsArray()
  @IsString({ each: true }) // Asegura que cada elemento es un string (IDs de roles)
  @ApiProperty({
    description: 'User role',
    example: '["Admin", "User"]',
  })
  roles: string[]

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'User categories',
    example: '["cm87jrl9s0000eerolx6nrfpa"]',
  })
  categories?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'User categories',
    example: '["cm87jrl9s0000eerolx6nrfpa"]',
  })
  educations?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'User skills',
    example: '["NodeJS", "React"]',
  })
  skills?: string[]

  @IsOptional()
  @ValidateNested({ each: true }) 
  @Type(() => ExperienceDto)
  @ApiProperty({
    description: 'User experience',
    example: '[{"titulo": "Organizador","place": "Sistema","startDate": "2024-03-13T12:00:00.000Z","endDate": "2024-12-31T23:59:59.999Z","description": "Este es un trabajo de organización"}]',
  })
  experience?: ExperienceDto[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'User rating',
    example: '2',
  })
  ratings?: string[]

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User avatar',
    example: 'http://www.example.com/avatar.jpg',
  })
  avatar?: string
}
