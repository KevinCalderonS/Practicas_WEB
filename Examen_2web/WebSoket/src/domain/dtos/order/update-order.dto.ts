import { PartialType } from "@nestjs/mapped-types"
import { CreateOrderDto } from "./create-order.dto"
import { IsEnum, IsOptional } from "class-validator"

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(["pending", "preparing", "ready", "delivered", "cancelled"])
  @IsOptional()
  status?: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
}
