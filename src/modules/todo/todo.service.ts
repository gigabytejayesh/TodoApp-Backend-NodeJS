import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { TodoList } from 'src/repositories/todo/todo-list-repository.entity';
import { TodoListRepositoryService } from 'src/repositories/todo/todo-list-repository.service';
import { CreateOrUpdateTodoListDto } from './todo.controller';

@Injectable()
export class TodoService {
  constructor(private todoListRepositoryService: TodoListRepositoryService) {}

  async getList(
    user_id: string,
    localBrowserDate: string,
  ): Promise<TodoList[] | null> {
    return await this.todoListRepositoryService.getTodoList(
      user_id,
      localBrowserDate,
    );
  }

  async addToList(
    userId: string,
    payload: CreateOrUpdateTodoListDto,
    localBrowserDate?: Date,
  ): Promise<TodoList> {
    payload['userId'] = userId;
    payload['createdAt'] = localBrowserDate || null;
    return this.todoListRepositoryService.addToList(payload);
  }

  async updateToList(
    todoId: string,
    payload: Partial<TodoList>,
  ): Promise<TodoList> {
    let record = await this.todoListRepositoryService.getTodoListByID(todoId);
    if (!record) {
      throw new HttpException(
        `Todo record is not available. Please contact our support at support@my-todo.in`,
        400,
      );
    }
    return this.todoListRepositoryService.updateToList(todoId, payload);
  }
}
