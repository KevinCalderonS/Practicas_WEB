import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Verificacion } from './entities/verificacion.entity';
import { CreateVerificacionInput } from './dto/create-verificacion.input';
import { UpdateVerificacionInput } from './dto/update-verificacion.input';
import { Donante } from 'src/donante/entities/donante.entity';

@Injectable()
export class VerificacionService {
  constructor(
    @InjectRepository(Verificacion)
    private repo: Repository<Verificacion>,
    @InjectRepository(Donante)
    private donanteRepo: Repository<Donante>
  ) {}

  async create(input: CreateVerificacionInput) {
  const donante = await this.donanteRepo.findOneBy({ id: input.donanteId });
  if (!donante) throw new Error('Donante no encontrado');
  return this.repo.save({ ...input, donante });
  }

  findAll() {
    return this.repo.find({ relations: ['donante'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['donante'] });
  }

  async update(id: number, input: UpdateVerificacionInput) {
  const existente = await this.repo.findOne({
    where: { id },
    relations: ['donante'],
  });
  if (!existente) return null;

  const actualizado = {
    ...existente,
    ...input,
  };

  return this.repo.save(actualizado);
}

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
