import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { UploadService } from '../upload/upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService, UploadService],
})
export class LanguageModule { }
