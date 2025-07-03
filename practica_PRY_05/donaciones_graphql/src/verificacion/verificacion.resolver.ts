import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VerificacionService } from './verificacion.service';
import { Verificacion } from './entities/verificacion.entity';
import { CreateVerificacionInput } from './dto/create-verificacion.input';
import { UpdateVerificacionInput } from './dto/update-verificacion.input';

@Resolver(() => Verificacion)
export class VerificacionResolver {
  constructor(private readonly service: VerificacionService) {}

  @Mutation(() => Verificacion)
  createVerificacion(@Args('createVerificacionInput') input: CreateVerificacionInput) {
    return this.service.create(input);
  }

  @Query(() => [Verificacion])
  findAllVerificacion() {
    return this.service.findAll();
  }

  @Query(() => Verificacion, { nullable: true })
  findOneVerificacion(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Verificacion)
  updateVerificacion(@Args('id', { type: () => Int }) id: number, @Args('updateVerificacionInput') input: UpdateVerificacionInput) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  removeVerificacion(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
