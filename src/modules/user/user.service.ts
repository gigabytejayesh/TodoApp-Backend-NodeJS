import { Injectable } from '@nestjs/common';
import { UserRepositoriesService } from 'src/repositories/user/user-repository.service';

@Injectable()
export class UserService {

    constructor(private userRepositoriesService: UserRepositoriesService) { }

    async getAllUsers() {
        return this.userRepositoriesService.getAllUsers()
    }

    async getUserByID(user_id: string) {
        try {
            return await this.userRepositoriesService.getUsersByUserID(user_id);
        } catch (error) {
            throw error;
        }
    }
}
