import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacto } from './entities/contacto.entity';
import { ContactoService } from './contacto.service';
import { ContactoGateway } from './contacto.gateway';
import { Donante } from 'src/donante/entities/donante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contacto, Donante])],
  providers: [ContactoService, ContactoGateway],
})
export class ContactoModule {}
