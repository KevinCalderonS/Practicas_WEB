// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../../guardado/categories/categories.module';
import { Category } from '../../guardado/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Category],
      synchronize: true,
    }),
    CategoriesModule,
  ],
})
export class AppModule {}
