import { Injectable } from '@nestjs/common';
import { TodoList } from 'src/repositories/todo/todo-list-repository.entity';
import { TodoListRepositoryService } from 'src/repositories/todo/todo-list-repository.service';

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
    user_id: string,
    payload: any,
    localBrowserDate?: Date,
  ): Promise<TodoList> {
    payload['user_id'] = user_id;
    payload['created_at'] = localBrowserDate || null;
    return this.todoListRepositoryService.addToList(payload);
  }
}
