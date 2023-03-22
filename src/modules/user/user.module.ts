import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { UserRepositoriesModule } from 'src/repositories/user/user-repository.module';
import { SupabaseGuard } from 'src/common/guards/supabase.guard';
import { SupabaseStrategy } from 'src/utils/supabase.strategy';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JWTTokenHelper } from 'src/utils/jwt-token-helper';

@Module({
    imports: [PassportModule, UserRepositoriesModule, AuthModule, JWTTokenHelper],
    controllers: [
        UserController,],
    providers: [
        UserService, SupabaseGuard, SupabaseStrategy, UserRepositoriesModule],
    exports: [SupabaseGuard, SupabaseStrategy]
})
export class UserModule { }
