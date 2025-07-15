import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { Donante } from 'src/donante/entities/donante.entity';

@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto)
    private repo: Repository<Contacto>,
    @InjectRepository(Donante)
    private donanteRepo: Repository<Donante>,
  ) {}

  async create(dto: CreateContactoDto) {
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

  async update(id: number, dto: UpdateContactoDto) {
    const encontrado = await this.repo.findOneBy({ id });
    if (!encontrado) return null;
    return this.repo.save({ ...encontrado, ...dto });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
