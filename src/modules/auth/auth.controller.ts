import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JWTTokenHelper } from 'src/utils/jwt-token-helper';

@Controller('/auth')
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly jwtTokenHelper: JWTTokenHelper) { }

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        console.log("Attempting to login using Google.");
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
        try {
            let user: any = await this.authService.googleLogin(request);
            let jwtToken = await this.jwtTokenHelper.signToken({ id: user.user_id, email: user.email });
            res.cookie(process.env.COOKIE_NAME, jwtToken, { httpOnly: true, secure: true, maxAge: 86400000 });
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }
}
