import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donante } from './entities/donante.entity';
import { DonanteService } from './donante.service';
import { DonanteGateway } from './donante.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Donante])],
  providers: [DonanteService, DonanteGateway],
})
export class DonanteModule {}
