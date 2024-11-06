import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RedisService } from 'src/client/redis.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userService: UserService,
    private redisService: RedisService
  ) { }

  async signup(create: CreateAuthDto) {
    const result = await this.userService.create(create)
  }

  async login(email: string) {

    const result = await this.userService.findByEmail(email)
    const otp = this.#_generateOtp()

    await this.redisService.setValue({
      key: `otp-${result.data.id}`,
      value: otp,
      expireTime: 120
    })

    return {
      message: "Success✅",
      otp
    }
  }

  async checkOtp(otp: number, userId: number) {
    const storedOtp = await this.redisService.getValue(`otp-${userId}`)
    if (!storedOtp || storedOtp.toString() !== otp.toString()) {
      throw new ConflictException("Invalid OTP")
    }

    return true
  }


  #_generateOtp() {
    return Math.floor(Math.random() * 100000 + 1)
  }
}
