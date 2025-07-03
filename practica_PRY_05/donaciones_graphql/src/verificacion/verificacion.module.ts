import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificacionService } from './verificacion.service';
import { VerificacionResolver } from './verificacion.resolver';
import { Verificacion } from './entities/verificacion.entity';
import { Donante } from 'src/donante/entities/donante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verificacion, Donante])],
  providers: [VerificacionService, VerificacionResolver],
})
export class VerificacionModule {}
