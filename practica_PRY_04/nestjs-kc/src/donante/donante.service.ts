import { Injectable, NotFoundException,  } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from "typeorm"
import type { CreateDonanteDto } from "./dto/create-donante.dto"
import type { UpdateDonanteDto } from "./dto/update-donante.dto"
import { Donante } from "./entities/donante.entity"

@Injectable()
export class DonanteService {
  constructor(@InjectRepository(Donante)
  private readonly donanteRepository: Repository<Donante>) {}

  async create(createDonanteDto: CreateDonanteDto): Promise<Donante> {
    const donante = this.donanteRepository.create(createDonanteDto)
    return await this.donanteRepository.save(donante)
  }

  async findAll(): Promise<Donante[]> {
    return await this.donanteRepository.find({
      relations: ["contactos", "colaboraciones"],
    })
  }

  async findOne(id: number): Promise<Donante> {
    const donante = await this.donanteRepository.findOne({
      where: { id },
      relations: ["contactos", "colaboraciones"],
    })

    if (!donante) {
      throw new NotFoundException(`Donante con ID ${id} no encontrado`)
    }

    return donante
  }

  async update(id: number, updateDonanteDto: UpdateDonanteDto): Promise<Donante> {
    const donante = await this.findOne(id)
    Object.assign(donante, updateDonanteDto)
    return await this.donanteRepository.save(donante)
  }

  async remove(id: number): Promise<void> {
    const donante = await this.findOne(id)
    await this.donanteRepository.remove(donante)
  }
}
