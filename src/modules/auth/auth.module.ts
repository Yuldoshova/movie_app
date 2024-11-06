import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { RedisService } from 'src/client/redis.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, RedisService],
})
export class AuthModule { }
