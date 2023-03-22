import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Module } from '@nestjs/common';
import { UserRepositoriesModule } from 'src/repositories/user/user-repository.module';
import { TodoListRepositoryModule } from 'src/repositories/todo/todo-list-repository.module';

@Module({
  imports: [UserRepositoriesModule, TodoListRepositoryModule],
  controllers: [TodoController],
  providers: [TodoService, TodoListRepositoryModule],
})
export class TodoModule {}
