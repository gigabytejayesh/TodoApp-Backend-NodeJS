import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    TodoModule,],
  controllers: [
    TodoController, AppController],
  providers: [
    TodoService],
})
export class AppModule { }
