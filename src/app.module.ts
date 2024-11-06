import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AuthModule } from './modules/auth/auth.module';
import { RedisCustomModule } from './client/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dbConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('dbConfig.host'),
        port: configService.get<number>('dbConfig.port'),
        username: configService.get<string>('dbConfig.user'),
        password: configService.get<string>('dbConfig.password'),
        database: configService.get<string>('dbConfig.dbName'),
        entities: [User],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService]
    }),
    RedisModule.forRoot({
      type: "single",
      options: {
        port: 6379,
        host: "localhost"
      }
    }),
    AuthModule,
    UserModule,
    RedisCustomModule
  ]
})
export class AppModule { }
