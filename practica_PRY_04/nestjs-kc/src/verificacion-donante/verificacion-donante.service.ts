import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from "typeorm"
import type { CreateVerificacionDonanteDto } from "./dto/create-verificacion-donante.dto"
import type { UpdateVerificacionDonanteDto } from "./dto/update-verificacion-donante.dto"
import { VerificacionDonante } from "./entities/verificacion-donante.entity"

@Injectable()
export class VerificacionDonanteService {
  constructor( @InjectRepository(VerificacionDonante) 
  private readonly verificacionDonanteRepository: Repository<VerificacionDonante>) {}

  async create(createVerificacionDonanteDto: CreateVerificacionDonanteDto): Promise<VerificacionDonante> {
    const verificacion = this.verificacionDonanteRepository.create(createVerificacionDonanteDto)
    return await this.verificacionDonanteRepository.save(verificacion)
  }

  async findAll(): Promise<VerificacionDonante[]> {
    return await this.verificacionDonanteRepository.find({
      relations: ["donante"],
    })
  }

  async findOne(id: number): Promise<VerificacionDonante> {
    const verificacion = await this.verificacionDonanteRepository.findOne({
      where: { id },
      relations: ["donante"],
    })

    if (!verificacion) {
      throw new NotFoundException(`verificacion de colaboración con ID ${id} no encontrado`)
    }

    return verificacion
  }

  async update(
    id: number,
    updateVerificacionDonanteDto: UpdateVerificacionDonanteDto,
  ): Promise<VerificacionDonante> {
    const verificacion = await this.findOne(id)
    Object.assign(verificacion, updateVerificacionDonanteDto)
    return await this.verificacionDonanteRepository.save(verificacion)
  }

  async remove(id: number): Promise<void> {
    const verificacion = await this.findOne(id)
    await this.verificacionDonanteRepository.remove(verificacion)
  }
}
