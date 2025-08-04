import { IsNumber, IsPositive, IsOptional, IsString } from "class-validator"

export class CreateOrderItemDto {
  @IsNumber()
  @IsPositive()
  productId: number

  @IsNumber()
  @IsPositive()
  quantity: number

  @IsString()
  @IsOptional()
  notes?: string
}
