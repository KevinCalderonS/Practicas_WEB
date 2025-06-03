import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Donante } from '../modules/donantes/domain/donante.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '123',
  database: process.env.DB_NAME || 'donaciones_db',
  synchronize: true,
  logging: false,
  entities: [Donante],
});