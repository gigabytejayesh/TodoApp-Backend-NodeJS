import { Injectable } from '@nestjs/common';
import { UserRepositoriesService } from 'src/repositories/user/user-repository.service';

@Injectable()
export class AuthService {

    constructor(private readonly userRepositoriesService: UserRepositoriesService) { }

    async googleLogin(request) {
        if (!request.user) {
            throw new Error("User info not available!")
        }
        let existingUser = await this.userRepositoriesService.getUsersByEmail(request.user.email)
        if (!existingUser) {
            existingUser = await this.userRepositoriesService.createUser(request.user)
        }
        return existingUser;
    }
}
