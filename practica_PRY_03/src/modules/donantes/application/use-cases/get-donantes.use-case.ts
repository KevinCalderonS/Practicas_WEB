export class GetDonantesUseCase {
  constructor(private donanteRepo: any) {}

  async execute() {
    return await this.donanteRepo.findAll();
  }
}