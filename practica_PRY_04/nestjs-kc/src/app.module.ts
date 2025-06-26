import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DonanteModule } from "./donante/donante.module"
import { InformacionContactoModule } from "./informacion-contacto/informacion-contacto.module"
import { VerificacionDonanteModule } from "./verificacion-donante/verificacion-donante.module"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Solo para desarrollo
    }),
    DonanteModule,
    InformacionContactoModule,
    VerificacionDonanteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
