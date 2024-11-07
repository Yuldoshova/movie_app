import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [LanguageController],
  providers: [LanguageService, UploadService],
})
export class LanguageModule {}
