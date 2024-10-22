import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.messagesService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.messagesService.update(id, body);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
