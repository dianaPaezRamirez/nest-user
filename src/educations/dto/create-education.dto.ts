import {  IsNotEmpty, IsString } from "class-validator";

export class CreateEducationDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    instituto: string;
}
