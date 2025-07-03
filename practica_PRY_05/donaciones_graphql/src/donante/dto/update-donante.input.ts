import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDonanteInput } from './create-donante.input';

@InputType()
export class UpdateDonanteInput extends PartialType(CreateDonanteInput) {}
