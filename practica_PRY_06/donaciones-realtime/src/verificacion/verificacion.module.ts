import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verificacion } from './entities/verificacion.entity';
import { VerificacionService } from './verificacion.service';
import { VerificacionGateway } from './verificacion.gateway';
import { Donante } from 'src/donante/entities/donante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verificacion, Donante])],
  providers: [VerificacionService, VerificacionGateway],
})
export class VerificacionModule {}
