import { AppDataSource } from '../../../../config/typeorm.config';
import { Donante } from '../../domain/donante.entity';

const repo = AppDataSource.getRepository(Donante);

export const TypeormDonanteRepository = {
  async save(d: Donante) {
    return await repo.save(d);
  },
  async findAll() {
    return await repo.find();
  },
};