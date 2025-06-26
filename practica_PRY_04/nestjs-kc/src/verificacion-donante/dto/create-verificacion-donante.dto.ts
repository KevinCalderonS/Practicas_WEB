import { IsString, IsNotEmpty, IsNumber, MaxLength, IsOptional, IsDateString } from "class-validator"

export class CreateVerificacionDonanteDto {
  @IsNumber()
  @IsNotEmpty()
  donante_id: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tipo_colaboracion: string

  @IsString()
  @IsNotEmpty()
  descripcion: string

  @IsDateString()
  @IsOptional()
  fecha_colaboracion?: Date
}
