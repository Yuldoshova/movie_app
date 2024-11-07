import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UploadService } from '../upload/upload.service';
import { TranslateService } from '../translate/translate.service';
import { Translate } from '../translate/entities/translate.entity';
import { Language } from '../language/entities/language.entity';
import { Definition } from '../translate/entities/definition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Translate, Language, Definition])],
  controllers: [CategoryController],
  providers: [CategoryService, UploadService, TranslateService],
})
export class CategoryModule {}
