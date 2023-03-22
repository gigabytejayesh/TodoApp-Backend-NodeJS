import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { GoogleStrategy } from 'src/utils/google.strategy';
import { SupabaseStrategy } from 'src/utils/supabase.strategy';
import { UserRepositoriesModule } from 'src/repositories/user/user-repository.module';
import { JWTTokenHelper } from 'src/utils/jwt-token-helper';

@Module({
    imports: [UserRepositoriesModule],
    controllers: [
        AuthController,],
    providers: [
        AuthService, GoogleStrategy, SupabaseStrategy, JWTTokenHelper],
})
export class AuthModule { }
