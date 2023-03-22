import { Controller, Get, UseGuards } from '@nestjs/common';
import { CookieAuthGuard } from './common/guards/cookie-auth.guard';

@Controller()
export class AppController {

    @Get()
    @UseGuards(CookieAuthGuard)
    async welcome() {
        return "Welcome to TODO APP"
    }
}
