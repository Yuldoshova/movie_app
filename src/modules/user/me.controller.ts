import { Body, Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MeService } from "./me.service";


@ApiTags("Me")
@Controller("/me")
export class MeController {

    constructor(
        private service: MeService
    ) { }

    @Get()
    async me(
        @Body('userId') userId: number
    ) {
        return await this.service.me(userId)
    }
}