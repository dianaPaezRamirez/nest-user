
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, ValidateNested } from "class-validator" 
import { ExperienceDto } from "./experience.dto"
import { Type } from "class-transformer"


export class UpdateUserDto {

    @IsOptional()
    @IsUUID()
    id?: string; // Asegura que el ID sea parte del objeto validado

  @IsEmail()
  @IsOptional()
  @IsString()
 
  email?: string 

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsPhoneNumber()
  contactPhone?: string

  @IsArray()
  @IsString({ each: true }) // Asegura que cada elemento es un string (IDs de roles)
  roles?: string[]

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
  @ValidateNested({ each: true }) 
  @Type(() => ExperienceDto)
  experience?: ExperienceDto[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ratings?: string[]

  @IsOptional()
  @IsString()
  avatar?: string
}
