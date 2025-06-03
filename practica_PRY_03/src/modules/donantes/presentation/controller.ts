import { Request, Response } from 'express';
import { CreateDonanteUseCase } from '../application/use-cases/create-donante.use-case';
import { GetDonantesUseCase } from '../application/use-cases/get-donantes.use-case';
import { TypeormDonanteRepository } from '../infrastructure/typeorm/donante.typeorm.repository';

const createUC = new CreateDonanteUseCase(TypeormDonanteRepository);
const getUC = new GetDonantesUseCase(TypeormDonanteRepository);

export const createDonante = async (req: Request, res: Response) => {
  const nuevo = await createUC.execute(req.body);
  res.json(nuevo);
};

export const getDonantes = async (_req: Request, res: Response) => {
  const todos = await getUC.execute();
  res.json(todos);
};