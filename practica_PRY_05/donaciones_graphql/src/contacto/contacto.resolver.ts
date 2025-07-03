import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactoService } from './contacto.service';
import { Contacto } from './entities/contacto.entity';
import { CreateContactoInput } from './dto/create-contacto.input';
import { UpdateContactoInput } from './dto/update-contacto.input';

@Resolver(() => Contacto)
export class ContactoResolver {
  constructor(private readonly service: ContactoService) {}

  @Mutation(() => Contacto)
  createContacto(@Args('createContactoInput') input: CreateContactoInput) {
    return this.service.create(input);
  }

  @Query(() => [Contacto])
  findAllContacto() {
    return this.service.findAll();
  }

  @Query(() => Contacto, { nullable: true })
  findOneContacto(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Contacto)
  updateContacto(@Args('id', { type: () => Int }) id: number, @Args('updateContactoInput') input: UpdateContactoInput) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  removeContacto(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
