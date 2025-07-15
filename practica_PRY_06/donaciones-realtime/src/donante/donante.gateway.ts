import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DonanteService } from './donante.service';
import { CreateDonanteDto } from './dto/create-donante.dto';
import { UpdateDonanteDto } from './dto/update-donante.dto';

@WebSocketGateway()
export class DonanteGateway {
  @WebSocketServer()
  wss: Server;

  constructor(private readonly service: DonanteService) {}

  async emitList() {
    const all = await this.service.findAll();
    this.wss.emit('donanteListados', all);
  }

  @SubscribeMessage('listarDonantes')
  async listar() {
    this.emitList();
  }

  @SubscribeMessage('createDonante')
  async create(@MessageBody() dto: CreateDonanteDto) {
    await this.service.create(dto);
    this.emitList();
  }

  @SubscribeMessage('updateDonante')
  async update(@MessageBody() data: { id: number; dto: UpdateDonanteDto }) {
    await this.service.update(data.id, data.dto);
    this.emitList();
  }

  @SubscribeMessage('removeDonante')
  async remove(@MessageBody() id: number) {
    await this.service.remove(id);
    this.emitList();
  }
}
