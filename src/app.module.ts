import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TodoModule } from './modules/todo/todo.module';
import { TodoService } from './modules/todo/todo.service';
import { TodoController } from './modules/todo/todo.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SupabaseStrategy } from './utils/supabase.strategy';
import { User } from './repositories/user/user-repository.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTTokenHelper } from './utils/jwt-token-helper';
import { UserRepositoriesModule } from './repositories/user/user-repository.module';
import { TodoList } from './repositories/todo/todo-list-repository.entity';
import { TodoListRepositoryModule } from './repositories/todo/todo-list-repository.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSSWORD,
          database: process.env.DB_NAME,
          autoLoadEntities: false,
          entities: [User, TodoList],
          synchronize: false,
          maxQueryExecutionTime: configService.get('db.maxQueryExecutionTime'),
          logging: true,
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    TodoListRepositoryModule,
    UserRepositoriesModule,
    UserModule,
    AuthModule,
    TodoModule,
    JWTTokenHelper,
  ],
  controllers: [TodoController, AppController],
  providers: [TodoService, SupabaseStrategy],
  exports: [SupabaseStrategy],
})
export class AppModule {}
