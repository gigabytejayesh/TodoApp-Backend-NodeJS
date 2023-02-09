import { Controller, Get } from '@nestjs/common';

@Controller('/todo')
export class TodoController {

    constructor() { }

    @Get()
    getHello(): string {
        return "Hello TODO"
    }

}
