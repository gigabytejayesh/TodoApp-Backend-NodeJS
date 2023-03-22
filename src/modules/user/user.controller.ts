import { Controller, Get, UseGuards } from "@nestjs/common";
import { CookieAuthGuard } from "src/common/guards/cookie-auth.guard";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    @UseGuards(CookieAuthGuard)
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":user_id")
    @UseGuards(CookieAuthGuard)
    async getUserByID(user_id: string) {
        return this.userService.getUserByID(user_id);
    }
}
