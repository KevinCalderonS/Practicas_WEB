import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateContactoInput {
  @Field(() => Int) donanteId: number;
  @Field() nombre_contacto: string;
  @Field() telefono: string;
  @Field() relacion: string;
}
