import { DonanteModel } from '../../../../modules/donantes/domain/donante.entity';

export const SequelizeDonanteRepository = {
  async save(d: any) {
    return await DonanteModel.create(d);
  },
  async findAll() {
    return await DonanteModel.findAll();
  },
};