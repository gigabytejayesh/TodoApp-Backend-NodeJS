/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    googleLogin(request) {
        if (!request.user) {
            return 'No user present in google'
        }
        return {
            message: 'User Info from Google',
            user: request.user
        }
    }
}
