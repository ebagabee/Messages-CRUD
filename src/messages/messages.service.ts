import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageType } from './types/message.type';
import { CreateMessageDto } from './dto/create-message.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class MessagesService {
  private messages: MessageType[] = [];

  getAllMessages() {
    return this.messages;
  }

  getOneMessage(id: string): MessageType {
    const messageFind = this.messages.find((message) => message.id === id);

    if (!messageFind) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    return messageFind;
  }

  createMessage(data: CreateMessageDto) {
    const message = { id: randomUUID(), description: data.description };

    if (!data.description) {
      throw new BadRequestException('Descrição é obrigatoria');
    }

    this.messages.push(message);
  }

  updateMessage(id: string, data: CreateMessageDto) {
    const messageFind = this.messages.find((message) => message.id === id);

    if (!messageFind) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    messageFind.description = data.description;
  }

  deleteMessage(id: string) {
    const messageFind = this.messages.findIndex((message) => message.id === id);

    if (messageFind === -1) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    this.messages.splice(messageFind, 1);
  }
}
