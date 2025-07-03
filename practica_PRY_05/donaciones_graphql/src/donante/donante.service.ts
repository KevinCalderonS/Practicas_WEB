import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donante } from './entities/donante.entity';
import { CreateDonanteInput } from './dto/create-donante.input';
import { UpdateDonanteInput } from './dto/update-donante.input';

@Injectable()
export class DonanteService {
  constructor(
    @InjectRepository(Donante)
    private repo: Repository<Donante>
  ) {}

  create(data: CreateDonanteInput) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, input: UpdateDonanteInput) {
  const existente = await this.repo.findOneBy({ id });
  if (!existente) return null;

  const actualizado = {
    ...existente,
    ...input,
  };

  return this.repo.save(actualizado);
}

  remove(id: number) {
    return this.repo.delete(id);
  }
}
