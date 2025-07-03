import { InputType, PartialType } from '@nestjs/graphql';
import { CreateContactoInput } from './create-contacto.input';

@InputType()
export class UpdateContactoInput extends PartialType(CreateContactoInput) {}
