import { PartialType } from "@nestjs/mapped-types"
import { CreateVerificacionDonanteDto } from "./create-verificacion-donante.dto"

export class UpdateVerificacionDonanteDto extends PartialType(CreateVerificacionDonanteDto) {}
