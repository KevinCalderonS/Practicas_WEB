import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';
import { CreateContactoInput } from './dto/create-contacto.input';
import { UpdateContactoInput } from './dto/update-contacto.input';
import { Donante } from 'src/donante/entities/donante.entity';

@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto)
    private repo: Repository<Contacto>,
    @InjectRepository(Donante)
    private donanteRepo: Repository<Donante>
  ) {}

  async create(input: CreateContactoInput) {
    const donante = await this.donanteRepo.findOneBy({ id: input.donanteId });
    if (!donante) {
      throw new Error('Donante not found');
    }
    return this.repo.save({ ...input, donante });
  }

  findAll() {
    return this.repo.find({ relations: ['donante'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['donante'] });
  }

  async update(id: number, input: UpdateContactoInput) {
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
