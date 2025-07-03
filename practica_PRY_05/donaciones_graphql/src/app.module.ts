import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { DonanteModule } from './donante/donante.module';
import { VerificacionModule } from './verificacion/verificacion.module';
import { ContactoModule } from './contacto/contacto.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // ✅ Agregado
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'donaciones.db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    DonanteModule,
    VerificacionModule,
    ContactoModule,
  ],
})
export class AppModule {}
