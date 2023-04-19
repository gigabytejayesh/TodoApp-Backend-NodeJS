import { Injectable } from '@nestjs/common';
import { UserRepositoriesService } from 'src/repositories/user/user-repository.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoriesService: UserRepositoriesService,
  ) {}

  async googleLogin(request: any): Promise<any> {
    try {
      if (!request.user) {
        throw new Error('User info not available!');
      }
      let existingUser = await this.userRepositoriesService.getUsersByEmail(
        request.user.email,
      );
      if (!existingUser) {
        existingUser = await this.userRepositoriesService.createUser(
          request.user,
        );
      }
      existingUser['accessToken'] = request.user.accessToken;
      existingUser['picture'] = request.user?.picture;
      return existingUser;
    } catch (error) {
      throw error;
    }
  }
}
