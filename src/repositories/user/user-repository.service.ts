import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user-repository.entity';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UserRepositoriesService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  baseQueryBuilder(): SelectQueryBuilder<User> {
    const builder = this.userRepository.createQueryBuilder('user');

    return builder;
  }

  async getAllUsers(): Promise<User[] | null> {
    const queryBuilder = this.baseQueryBuilder();
    const item: User[] | null = await queryBuilder.getMany();
    return item;
  }

  async getUsersByEmail(email: string): Promise<User | null> {
    const queryBuilder = this.baseQueryBuilder();
    queryBuilder.where('email = :email', { email });
    const item: User | null = await queryBuilder.getOne();
    return item;
  }

  async getUsersByUserID(user_id: string): Promise<User | null> {
    try {
      const queryBuilder = this.baseQueryBuilder();
      queryBuilder.where('user.user_id = :user_id', { user_id });
      const item: User | null = await queryBuilder.getOne();
      return item;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userObject: any) {
    const { firstName, lastName, email } = userObject;
    const newUserRepo = this.userRepository.create({
      name: firstName + ' ' + lastName,
      email,
      userId: await uuidv4(),
    });

    return await this.userRepository.save(newUserRepo);
  }
}
