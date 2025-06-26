import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donante } from './entities/donante.entity';
import { DonanteService } from './donante.service';
import { DonanteController } from './donante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Donante])],
  controllers: [DonanteController],
  providers: [DonanteService],
  exports: [DonanteService],
})
export class DonanteModule {}