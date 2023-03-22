import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, SelectQueryBuilder } from 'typeorm';
import * as moment from 'moment';
import { TodoList } from './todo-list-repository.entity';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class TodoListRepositoryService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
  ) {}

  baseQueryBuilder(): SelectQueryBuilder<TodoList> {
    const builder = this.todoListRepository.createQueryBuilder('todo_list');
    return builder;
  }

  async getTodoList(
    user_id: string,
    localBrowserDate: any,
  ): Promise<TodoList[] | null> {
    try {
      const queryBuilder = this.baseQueryBuilder();
      queryBuilder
        .where('user_id = :user_id', { user_id })
        .andWhere('created_at BETWEEN :startDate AND :endDate', {
          startDate:
            moment(localBrowserDate).format('YYYY-MM-DD') + ' 00:00:00',
          endDate:
            moment(localBrowserDate).add(1, 'day').format('YYYY-MM-DD') +
            ' 00:00:00',
        })
        .addOrderBy('created_at', 'DESC');
      const item: TodoList[] | null = await queryBuilder.getMany();
      return item;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addToList(todoListData: any): Promise<TodoList> {
    try {
      const { content, user_id, created_at } = todoListData;
      const newRecord = this.todoListRepository.create({
        content,
        userId: user_id,
        createdAt: created_at,
        todoId: await uuidv4(),
      });
      return await this.todoListRepository.save(newRecord);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
