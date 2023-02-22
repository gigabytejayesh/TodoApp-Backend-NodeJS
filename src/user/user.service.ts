import { Injectable } from '@nestjs/common';
import { UserRepositoriesService } from 'src/repositories/user/user-repository.service';

@Injectable()
export class UserService {

    constructor(private userRepositoriesService: UserRepositoriesService) { }

    async getAllUsers() {
        return this.userRepositoriesService.getAllUsers()
    }
}
