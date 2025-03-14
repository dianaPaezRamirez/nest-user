import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ExperienceDto {
    @IsString()
    @IsNotEmpty()
    titulo   :   string

    @IsString()
    @IsNotEmpty()
    place      : string

    @IsDate() // ✅ Usa IsDate para fechas
    @IsNotEmpty()
    @Type(() => Date) // ✅ Convierte la cadena a Date
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    description: string
}