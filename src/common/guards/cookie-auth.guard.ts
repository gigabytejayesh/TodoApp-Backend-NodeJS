import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/repositories/user/user-repository.entity';
import { UserRepositoriesService } from 'src/repositories/user/user-repository.service';
import { JWTTokenHelper } from 'src/utils/jwt-token-helper';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepositoriesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const cookieValue = request.cookies[process.env.COOKIE_NAME];
      if (!cookieValue) {
        return false;
      }
      let tokenData: any = await new JWTTokenHelper().verifyToken(cookieValue);
      // TODO: Add Interface for tokenData
      if (!tokenData) {
        console.log('Invalid token provided');
        return false;
      }
      let user: User = await this.userRepository.getUsersByUserID(tokenData.id);
      if (!user) {
        throw new HttpException(
          `User with email id ${tokenData.email} is not available. Please contact our support at support@my-todo.in`,
          401,
        );
      }
      request.user = user;
      return true;
    } catch (error) {
      throw error;
    }
  }
}
