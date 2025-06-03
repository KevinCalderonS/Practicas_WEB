import { Donante } from '../../domain/donante.entity';

export class CreateDonanteUseCase {
  constructor(private donanteRepo: any) {}

  async execute(data: Donante) {
    return await this.donanteRepo.save(data);
  }
}