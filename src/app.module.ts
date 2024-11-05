import { appConfig, dbConfig } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load:[appConfig, dbConfig]
  })]
})
export class AppModule { }
