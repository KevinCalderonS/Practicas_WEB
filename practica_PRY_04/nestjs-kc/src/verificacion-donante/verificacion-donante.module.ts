import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificacionDonante } from './entities/verificacion-donante.entity';
import { VerificacionDonanteService } from './verificacion-donante.service';
import { VerificacionDonanteController } from './verificacion-donante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VerificacionDonante])],
  controllers: [VerificacionDonanteController],
  providers: [VerificacionDonanteService],
  exports: [VerificacionDonanteService],
})
export class VerificacionDonanteModule {}