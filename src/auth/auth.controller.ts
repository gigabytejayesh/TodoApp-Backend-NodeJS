import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        console.log("Attempting to login using Google.");
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() request) {
        try {
            let user = this.authService.googleLogin(request);
            return user;

            // Set cookie
        } catch (error) {
            console.log(error);
        }
    }
}
