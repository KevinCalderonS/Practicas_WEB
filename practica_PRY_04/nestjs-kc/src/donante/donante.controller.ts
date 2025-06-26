import { Controller, Get, Post, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import type { DonanteService } from "./donante.service"
import type { CreateDonanteDto } from "./dto/create-donante.dto"
import type { UpdateDonanteDto } from "./dto/update-donante.dto"
import { Donante } from "./entities/donante.entity"

@Controller("donantes")
export class DonanteController {
  constructor( @InjectRepository(Donante) 
  private readonly donanteService: DonanteService) {}

  @Post()
  create(createDonanteDto: CreateDonanteDto) {
    return this.donanteService.create(createDonanteDto)
  }

  @Get()
  findAll() {
    return this.donanteService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.donanteService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id', ParseIntPipe) id: number, updateDonanteDto: UpdateDonanteDto) {
    return this.donanteService.update(id, updateDonanteDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.donanteService.remove(id);
  }
}
