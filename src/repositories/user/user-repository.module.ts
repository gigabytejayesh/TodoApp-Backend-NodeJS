import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user-repository.entity";
import { UserRepositoriesService } from "./user-repository.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
        ]),
    ],
    providers: [UserRepositoriesService],
    exports: [UserRepositoriesService],
})
export class UserRepositoriesModule { }
