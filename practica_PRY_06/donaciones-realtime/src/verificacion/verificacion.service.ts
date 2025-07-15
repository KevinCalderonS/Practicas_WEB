import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Verificacion } from './entities/verificacion.entity';
import { CreateVerificacionDto } from './dto/create-verificacion.dto';
import { UpdateVerificacionDto } from './dto/update-verificacion.dto';
import { Donante } from 'src/donante/entities/donante.entity';

@Injectable()
export class VerificacionService {
  constructor(
    @InjectRepository(Verificacion)
    private repo: Repository<Verificacion>,
    @InjectRepository(Donante)
    private donanteRepo: Repository<Donante>
  ) {}

  async create(dto: CreateVerificacionDto) {
    const donante = await this.donanteRepo.findOneBy({ id: dto.donanteId });
    if (!donante) throw new Error('Donante no encontrado');
    return this.repo.save({ ...dto, donante });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateVerificacionDto) {
    const v = await this.repo.findOneBy({ id });
    if (!v) return null;
    return this.repo.save({ ...v, ...dto });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
