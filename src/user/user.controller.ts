import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from "@nestjs/common";
import { UserId } from "src/common/decorator/supabase.user.decorator";
import { SupabaseGuard } from "src/common/guards/supabase.guard";
import { UserRepositoriesService } from "src/repositories/user/user-repository.service";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
}
