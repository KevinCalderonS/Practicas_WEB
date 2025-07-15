import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donante } from './entities/donante.entity';
import { CreateDonanteDto } from './dto/create-donante.dto';
import { UpdateDonanteDto } from './dto/update-donante.dto';

@Injectable()
export class DonanteService {
  constructor(
    @InjectRepository(Donante)
    private repo: Repository<Donante>
  ) {}

  create(dto: CreateDonanteDto) {
    const donante = this.repo.create(dto);
    return this.repo.save(donante);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateDonanteDto) {
    const encontrado = await this.repo.findOneBy({ id });
    if (!encontrado) return null;
    const actualizado = { ...encontrado, ...dto };
    return this.repo.save(actualizado);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
