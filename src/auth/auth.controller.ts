import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() request) {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() request) {
        return this.authService.googleLogin(request);
    }
}
