import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DonanteService } from './donante.service';
import { Donante } from './entities/donante.entity';
import { CreateDonanteInput } from './dto/create-donante.input';
import { UpdateDonanteInput } from './dto/update-donante.input';

@Resolver(() => Donante)
export class DonanteResolver {
  constructor(private readonly service: DonanteService) {}

  @Mutation(() => Donante)
  createDonante(@Args('createDonanteInput') input: CreateDonanteInput) {
    return this.service.create(input);
  }

  @Query(() => [Donante])
  findAllDonante() {
    return this.service.findAll();
  }

  @Query(() => Donante, { nullable: true })
  findOneDonante(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Donante)
  updateDonante(@Args('id', { type: () => Int }) id: number, @Args('updateDonanteInput') input: UpdateDonanteInput) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean)
  removeDonante(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
