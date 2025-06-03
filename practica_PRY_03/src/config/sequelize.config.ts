import { Sequelize } from 'sequelize-typescript';
import { DonanteModel } from '../modules/donantes/domain/donante.entity';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123',
  database: process.env.DB_NAME || 'donaciones_db',
  models: [DonanteModel],
});