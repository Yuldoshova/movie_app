import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  JsonWebTokenError,
  JwtService,
  NotBeforeError,
  TokenExpiredError,
} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { RedisService } from 'src/client/redis.service';
import { LoginDto } from './dto/login.dto';
import { CheckOtpDto } from './dto/check-otp.dto';
import { RefreshDto } from './dto/refresh.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private redisService: RedisService,
    private mailService: MailerService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async login(payload: LoginDto) {
    const result = await this.userService.findByEmail(payload.email);
    const findUser = result.data;
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    await this.redisService.setValue({
      key: `otp-${findUser.id}`,
      value: otp,
      expireTime: parseInt(process.env.REDIS_EXPIRE_TIME),
    });

    await this.mailService.sendMail({
      from: this.config.get<string>('emailConfig.username'),
      to: findUser.email,
      subject: `Verification code for movie app`,
      html: `<h2>Sizning verifikatsiya kodingiz:<h1>${otp}</h1></h2>`,
    });

    return {
      message: 'Success✅',
    };
  }

  async checkOtp(payload: CheckOtpDto) {
    const result = await this.userService.findByEmail(payload.email);
    const findUser = result.data;
    const storedOtp = await this.redisService.getValue(`otp-${payload.userId}`);

    if (!storedOtp || storedOtp.toString() !== payload.otp.toString()) {
      throw new ConflictException('Invalid OTP❗');
    }

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
      message: 'Success✅',
      accessToken,
      refreshToken,
    };
  }

  async refresh(payload: RefreshDto) {
    try {
      this.jwt.verify(payload.refreshToken, {
        secret: this.config.get<string>('jwt.refreshKey'),
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Token already expired⛔');
      }

      if (error instanceof NotBeforeError) {
        throw new ConflictException('Token not before error⛔');
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('Internal error occurred⛔');
    }

    const userDecodedData = this.jwt.decode(payload.refreshToken);

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
      message: 'Success✅',
      accessToken,
      refreshToken,
    };
  }

  async googleAuth(req: any) {
    const findUser = await (
      await this.userService.findByEmail(req.user.emails[0].value)
    ).data;
    if (findUser) {
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

      return { accessToken, user: findUser, isNew: false };
    }

    console.log(req.user);
    const newUser = await this.userService.create({
      firstName: req.user.displayName,
      lastName: req.user.displayName,
      email: req.user.emails[0].value,
    });

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

    return { accessToken, user: newUser, isNew: true };
  }
}
