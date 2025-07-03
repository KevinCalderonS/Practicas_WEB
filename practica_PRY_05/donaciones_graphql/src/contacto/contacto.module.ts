import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactoService } from './contacto.service';
import { ContactoResolver } from './contacto.resolver';
import { Contacto } from './entities/contacto.entity';
import { Donante } from 'src/donante/entities/donante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contacto, Donante])],
  providers: [ContactoService, ContactoResolver],
})
export class ContactoModule {}
