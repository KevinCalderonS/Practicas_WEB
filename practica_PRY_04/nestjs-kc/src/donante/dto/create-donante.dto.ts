import { IsString, IsEmail, IsNotEmpty, IsOptional, MaxLength } from "class-validator"

export class CreateDonanteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  correo: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  direccion: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  tipo_documento: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  numero_documento: string

  @IsString()
  @IsOptional()
  @MaxLength(20)
  estado?: string
}
