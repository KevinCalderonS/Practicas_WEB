import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean, IsOptional } from "class-validator"

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsString()
  @IsOptional()
  image?: string

  @IsNumber()
  @IsPositive()
  categoryId: number

  @IsBoolean()
  @IsOptional()
  available?: boolean = true
}
