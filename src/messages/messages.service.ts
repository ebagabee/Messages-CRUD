import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

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

  findOne(id: number) {
    const message = this.messages.find(message => message.id === +id);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  create(createMessageDto: CreateMessageDto) {
    this.lastId++;

    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessageDto,
      read: false,
      date: new Date(),
    };
    this.messages.push(newMessage);
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    const messageIndex = this.messages.findIndex(item => item.id === +id);

    if (messageIndex === -1) {
      throw new NotFoundException("Don't have the message");
    }

    const message = this.messages[messageIndex];

    this.messages[messageIndex] = { ...message, ...updateMessageDto };

    return this.messages[messageIndex];
  }

  remove(id: number) {
    const messageIndex = this.messages.findIndex(item => item.id === id);

    if (messageIndex === -1) {
      throw new NotFoundException("Don't have the message");
    }

    const message = this.messages[messageIndex];
    this.messages.splice(messageIndex, 1);

    return message;
  }
}
