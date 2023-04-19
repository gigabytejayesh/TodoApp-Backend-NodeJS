import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CookieAuthGuard } from 'src/common/guards/cookie-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(CookieAuthGuard)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  @UseGuards(CookieAuthGuard)
  async getCurrentUser(@Req() request) {
    return this.userService.getUserByID(request.user.userId);
  }

  @Get(':user_id')
  @UseGuards(CookieAuthGuard)
  async getUserByID(user_id: string) {
    return this.userService.getUserByID(user_id);
  }
}
