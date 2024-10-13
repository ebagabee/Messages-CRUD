import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.getAllMessages();
  }
  @Get(':id')
  findOneMessage(@Param('id') id: string) {
    return this.messagesService.getOneMessage(id);
  }

  @Post()
  createMessage(@Body() data: CreateMessageDto) {
    this.messagesService.createMessage(data);
  }
}
