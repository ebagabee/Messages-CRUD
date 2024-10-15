import { Injectable } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: MessageEntity[] = [
    {
      id: 1,
      text: 'Este é um recado de teste',
      from: 'Joao',
      to: 'Gabe',
      read: false,
      date: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    return this.messages.find((message) => message.id === +id);
  }

  create(data: any) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...data,
    };
    this.messages.push(newMessage);
  }

  update(id: string, body: any) {
    const messageIndex = this.messages.findIndex((item) => item.id === +id);

    if (messageIndex !== -1) {
      const message = this.messages[messageIndex];

      this.messages[messageIndex] = { ...message, ...body };
    }
  }

  remove(id: string) {
    const messageIndex = this.messages.findIndex((item) => item.id === +id);

    if (messageIndex != -1) {
      this.messages.splice(messageIndex, 1);
    }
  }
}
