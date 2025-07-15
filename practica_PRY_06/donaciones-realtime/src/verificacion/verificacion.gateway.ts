import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VerificacionService } from './verificacion.service';
import { CreateVerificacionDto } from './dto/create-verificacion.dto';
import { UpdateVerificacionDto } from './dto/update-verificacion.dto';

@WebSocketGateway()
export class VerificacionGateway {
  @WebSocketServer()
  wss: Server;

  constructor(private readonly service: VerificacionService) {}

  async emitList() {
    const all = await this.service.findAll();
    this.wss.emit('verificacionListadas', all);
  }

  @SubscribeMessage('listarVerificaciones')
  listar() {
    this.emitList();
  }

  @SubscribeMessage('createVerificacion')
  async create(@MessageBody() dto: CreateVerificacionDto) {
    await this.service.create(dto);
    this.emitList();
  }

  @SubscribeMessage('updateVerificacion')
  async update(@MessageBody() data: { id: number; dto: UpdateVerificacionDto }) {
    await this.service.update(data.id, data.dto);
    this.emitList();
  }

  @SubscribeMessage('removeVerificacion')
  async remove(@MessageBody() id: number) {
    await this.service.remove(id);
    this.emitList();
  }
}
