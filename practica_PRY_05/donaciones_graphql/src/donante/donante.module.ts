import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonanteService } from './donante.service';
import { DonanteResolver } from './donante.resolver';
import { Donante } from './entities/donante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donante])],
  providers: [DonanteService, DonanteResolver],
  exports: [TypeOrmModule],
})
export class DonanteModule {}
