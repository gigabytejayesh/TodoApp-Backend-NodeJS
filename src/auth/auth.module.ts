import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { GoogleStrategy } from 'src/utils/google.strategy';

@Module({
    imports: [],
    controllers: [
        AuthController,],
    providers: [
        AuthService, GoogleStrategy],
})
export class AuthModule { }
