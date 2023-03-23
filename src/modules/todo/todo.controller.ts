import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import { CookieAuthGuard } from 'src/common/guards/cookie-auth.guard';
import { TodoList } from 'src/repositories/todo/todo-list-repository.entity';
import { TodoService } from './todo.service';

export class CreateOrUpdateTodoListDto {
  content: string;
}

@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('list')
  @UseGuards(CookieAuthGuard)
  async getList(
    @Req() request,
    @Query('localBrowserDate') localBrowserDate: string,
  ): Promise<TodoList[] | null> {
    try {
      let result: TodoList[] | null = await this.todoService.getList(
        request.user.userId,
        localBrowserDate,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Post('list')
  @UseGuards(CookieAuthGuard)
  async addToList(
    @Req() request,
    @Query('localBrowserDate') localBrowserDate: Date,
    @Body() payload: CreateOrUpdateTodoListDto,
  ): Promise<TodoList> {
    try {
      return await this.todoService.addToList(
        request.user.userId,
        payload,
        localBrowserDate || null,
      );
    } catch (error) {
      throw error;
    }
  }

  @Put('list/:todo_id')
  @UseGuards(CookieAuthGuard)
  async updateToList(
    @Req() request,
    @Param('todo_id') todo_id: string,
    @Body() payload: CreateOrUpdateTodoListDto,
  ): Promise<TodoList> {
    try {
      return await this.todoService.updateToList(todo_id, payload);
    } catch (error) {
      throw error;
    }
  }
}
