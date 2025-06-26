import { PartialType } from "@nestjs/mapped-types"
import { CreateInformacionContactoDto } from "./create-informacion-contacto.dto"

export class UpdateInformacionContactoDto extends PartialType(CreateInformacionContactoDto) {}
