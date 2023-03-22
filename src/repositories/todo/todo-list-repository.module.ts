import { TodoListRepositoryService } from './todo-list-repository.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './todo-list-repository.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TodoList,
        ]),
    ],
    providers: [
        TodoListRepositoryService,],
    exports: [TodoListRepositoryService]
})
export class TodoListRepositoryModule { }
