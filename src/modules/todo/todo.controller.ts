import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Body, Post, Query } from '@nestjs/common/decorators';
import { CookieAuthGuard } from 'src/common/guards/cookie-auth.guard';
import { TodoList } from 'src/repositories/todo/todo-list-repository.entity';
import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('list')
  @UseGuards(CookieAuthGuard)
  async getList(
    @Req() request,
    @Query('localBrowserDate') localBrowserDate: string,
  ): Promise<TodoList[] | null> {
    let result: TodoList[] | null = await this.todoService.getList(
      request.user.userId,
      localBrowserDate,
    );
    return result;
  }

  @Post('list')
  @UseGuards(CookieAuthGuard)
  async addToList(
    @Req() request,
    @Query('localBrowserDate') localBrowserDate: Date,
    @Body() payload: any,
  ): Promise<TodoList> {
    try {
      return await this.todoService.addToList(
        request.user.userId,
        payload,
        localBrowserDate || null,
      );
    } catch (error) {
      throw Error(error);
    }
  }
}
