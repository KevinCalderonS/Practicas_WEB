import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ContactoService } from './contacto.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';

@WebSocketGateway()
export class ContactoGateway {
  @WebSocketServer()
  wss: Server;

  constructor(private readonly service: ContactoService) {}

  async emitList() {
    const all = await this.service.findAll();
    this.wss.emit('contactoListados', all);
  }

  @SubscribeMessage('listarContactos')
  listar() {
    this.emitList();
  }

  @SubscribeMessage('createContacto')
  async create(@MessageBody() dto: CreateContactoDto) {
    await this.service.create(dto);
    this.emitList();
  }

  @SubscribeMessage('updateContacto')
  async update(@MessageBody() data: { id: number; dto: UpdateContactoDto }) {
    await this.service.update(data.id, data.dto);
    this.emitList();
  }

  @SubscribeMessage('removeContacto')
  async remove(@MessageBody() id: number) {
    await this.service.remove(id);
    this.emitList();
  }
}
