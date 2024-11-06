import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RedisService } from 'src/client/redis.service';
import { LoginDto } from './dto/login.dto';
import { CheckOtpDto } from './dto/check-otp.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private redisService: RedisService,
    private config: ConfigService,
    private jwt: JwtService
  ) { }


  // async login(loginDto: LoginDto) {

  //   const result = await this.userService.findByEmail(loginDto)
    // const otp = Math.floor(Math.random() * 100000 + 1)

    // await this.redisService.setValue({
    //   key: `otp-${result.data.id}`,
    //   value: otp,
    //   expireTime: 120
    // })

  //   return {
  //     message: "Success✅",
  //     otp
  //   }
  // }

  async checkOtp(checkOtpDto: CheckOtpDto) {
    const storedOtp = await this.redisService.getValue(`otp-${checkOtpDto.userId}`)
    if (!storedOtp || storedOtp.toString() !== checkOtpDto.otp.toString()) {
      throw new ConflictException("Invalid OTP❗")
    }

    return true
  }

/*
-email kiritadi
-otp kodni emailiga yuboradi (emailda url va kod keladi)
-kodni urlga kiritadi (unga access va refresh tokenlar beriladi)

*/

  async login(payload: LoginDto) {
    const result = await this.userService.findByEmail(payload.email)
    const findUser = result.data


    const accessToken = await this.jwt.signAsync(
      {
        id: findUser.id,
        role: findUser.role,
      },
      {
        expiresIn: this.config.get<number>('jwt.accessTime'),
        secret: this.config.get<string>('jwt.accessKey'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      {
        id: findUser.id,
        role: findUser.role,
      },
      {
        expiresIn: this.config.get<string>('jwt.refreshTime'),
        secret: this.config.get<string>('jwt.refreshKey'),
      },
    );

    return {
      message: "Success✅",
      accessToken,
      refreshToken,
    };
  }

  async refresh(payload: RefreshDto) {
    try {
      this.jwt.verify(payload.refreshToken, { secret: this.config.get<string>('jwt.refreshKey') })
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException("Token already expired⛔")
      }

      if (error instanceof NotBeforeError) {
        throw new ConflictException("Token not before error⛔")
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(error.message)
      }

      throw new InternalServerErrorException("Internal error occurred⛔")
    }

    const userDecodedData = this.jwt.decode(payload.refreshToken)

    const accessToken = await this.jwt.signAsync(
      {
        id: userDecodedData?.id,
        role: userDecodedData?.role,
      },
      {
        expiresIn: this.config.get<number>('jwt.accessTime'),
        secret: this.config.get<string>('jwt.accessKey'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      {
        id: userDecodedData?.id,
        role: userDecodedData?.role,
      },
      {
        expiresIn: this.config.get<string>('jwt.refreshTime'),
        secret: this.config.get<string>('jwt.refreshKey'),
      },
    );

    return {
      message: "Success✅",
      accessToken,
      refreshToken,
    };
  }
}
