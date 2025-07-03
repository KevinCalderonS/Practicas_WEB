import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDonanteInput {
  @Field() nombre: string;
  @Field() correo: string;
  @Field() telefono: string;
  @Field() direccion: string;
  @Field() tipo_documento: string;
  @Field() numero_documento: string;
  @Field() fecha_registro: string;
  @Field() estado: string;
}
