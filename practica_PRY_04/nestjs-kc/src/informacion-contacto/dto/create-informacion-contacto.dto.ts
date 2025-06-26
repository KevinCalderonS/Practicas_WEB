import { IsString, IsNotEmpty, IsNumber, MaxLength } from "class-validator"

export class CreateInformacionContactoDto {
  @IsNumber()
  @IsNotEmpty()
  donante_id: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre_contacto: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefono: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  relacion: string
}
