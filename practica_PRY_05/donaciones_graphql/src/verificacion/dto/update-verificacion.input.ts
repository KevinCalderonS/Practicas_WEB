import { InputType, PartialType } from '@nestjs/graphql';
import { CreateVerificacionInput } from './create-verificacion.input';

@InputType()
export class UpdateVerificacionInput extends PartialType(CreateVerificacionInput) {}
