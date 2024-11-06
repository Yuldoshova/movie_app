import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MeService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async me(userId: number) {
        return await this.userRepository.findOne({ where: { id: userId } })
    }
}