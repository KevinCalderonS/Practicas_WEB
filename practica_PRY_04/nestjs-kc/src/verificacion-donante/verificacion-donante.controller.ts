import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import type { VerificacionDonanteService } from "./verificacion-donante.service"
import type { CreateVerificacionDonanteDto } from "./dto/create-verificacion-donante.dto"
import type { UpdateVerificacionDonanteDto } from "./dto/update-verificacion-donante.dto"
import { VerificacionDonante } from "./entities/verificacion-donante.entity"

@Controller("verificacion-donante")
export class VerificacionDonanteController {
  constructor( @InjectRepository(VerificacionDonante) 
  private readonly verificacionDonanteService: VerificacionDonanteService) {}

  @Post()
  create(createVerificacionDonanteDto: CreateVerificacionDonanteDto) {
    return this.verificacionDonanteService.create(createVerificacionDonanteDto);
  }

  @Get()
  findAll() {
    return this.verificacionDonanteService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.verificacionDonanteService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateVerificacionDonanteDto: UpdateVerificacionDonanteDto) {
    return this.verificacionDonanteService.update(id, updateVerificacionDonanteDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.verificacionDonanteService.remove(id);
  }
}
