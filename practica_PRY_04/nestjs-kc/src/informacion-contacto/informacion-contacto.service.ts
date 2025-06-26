import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from "typeorm"
import type { CreateInformacionContactoDto } from "./dto/create-informacion-contacto.dto"
import type { UpdateInformacionContactoDto } from "./dto/update-informacion-contacto.dto"
import { InformacionContacto } from "./entities/informacion-contacto.entity"

@Injectable()
export class InformacionContactoService {
  constructor( @InjectRepository(InformacionContacto)
  private readonly informacionContactoRepository: Repository<InformacionContacto>) {}

  async create(createInformacionContactoDto: CreateInformacionContactoDto): Promise<InformacionContacto> {
    const contacto = this.informacionContactoRepository.create(createInformacionContactoDto)
    return await this.informacionContactoRepository.save(contacto)
  }

  async findAll(): Promise<InformacionContacto[]> {
    return await this.informacionContactoRepository.find({
      relations: ["donante"],
    })
  }

  async findOne(id: number): Promise<InformacionContacto> {
    const contacto = await this.informacionContactoRepository.findOne({
      where: { id },
      relations: ["donante"],
    })

    if (!contacto) {
      throw new NotFoundException(`Información de contacto con ID ${id} no encontrada`)
    }

    return contacto
  }

  async update(id: number, updateInformacionContactoDto: UpdateInformacionContactoDto): Promise<InformacionContacto> {
    const contacto = await this.findOne(id)
    Object.assign(contacto, updateInformacionContactoDto)
    return await this.informacionContactoRepository.save(contacto)
  }

  async remove(id: number): Promise<void> {
    const contacto = await this.findOne(id)
    await this.informacionContactoRepository.remove(contacto)
  }
}
