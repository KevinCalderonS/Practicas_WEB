import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import type { InformacionContactoService } from "./informacion-contacto.service"
import type { CreateInformacionContactoDto } from "./dto/create-informacion-contacto.dto"
import type { UpdateInformacionContactoDto } from "./dto/update-informacion-contacto.dto"
import { InformacionContacto } from "./entities/informacion-contacto.entity"

@Controller("informacion-contacto")
export class InformacionContactoController {
  constructor( @InjectRepository(InformacionContacto) 
  private readonly informacionContactoService: InformacionContactoService) {}

  @Post()
  create(createInformacionContactoDto: CreateInformacionContactoDto) {
    return this.informacionContactoService.create(createInformacionContactoDto)
  }

  @Get()
  findAll() {
    return this.informacionContactoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.informacionContactoService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateInformacionContactoDto: UpdateInformacionContactoDto) {
    return this.informacionContactoService.update(id, updateInformacionContactoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.informacionContactoService.remove(id);
  }
}
