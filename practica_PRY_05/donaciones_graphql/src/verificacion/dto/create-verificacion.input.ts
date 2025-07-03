import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateVerificacionInput {
  @Field(() => Int) donanteId: number;
  @Field() fecha_verificacion: string;
  @Field() resultado: string;
  @Field() observaciones: string;
}
