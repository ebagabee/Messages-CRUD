import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageType } from './types/message.type';

@Injectable()
export class MessagesService {
  private messages: MessageType[];

  getAllMessages() {
    return this.messages;
  }

  getOneMessage(id: number): MessageType {
    const messageFind = this.messages.find((message) => message.id === id);

    if (!messageFind) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    return messageFind;
  }
}
