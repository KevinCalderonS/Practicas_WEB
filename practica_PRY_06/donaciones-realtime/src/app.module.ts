import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonanteModule } from './donante/donante.module';
import { VerificacionModule } from './verificacion/verificacion.module';
import { ContactoModule } from './contacto/contacto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'realtime.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DonanteModule,
    VerificacionModule,
    ContactoModule,
  ],
})
export class AppModule {}
