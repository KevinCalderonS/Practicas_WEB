import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateOrderItemDto } from "./create-order-item.dto"

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string

  @IsString()
  @IsOptional()
  customerPhone?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[]
}
