import { Entity as OrmEntity, PrimaryGeneratedColumn, Column as OrmColumn } from 'typeorm';

@OrmEntity()
export class Donante {
  @PrimaryGeneratedColumn()
  id!: number;

  @OrmColumn()
  nombre!: string;

  @OrmColumn()
  contacto!: string;

  @OrmColumn()
  direccion!: string;
}

// Sequelize
import { Table, Column as SeqColumn, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'donantes', timestamps: false })
export class DonanteModel extends Model {
  @SeqColumn({ type: DataType.STRING })
  declare nombre: string;

  @SeqColumn({ type: DataType.STRING })
  declare contacto: string;

  @SeqColumn({ type: DataType.STRING })
  declare direccion: string;
}

// (continúa igual el resto del contenido...)