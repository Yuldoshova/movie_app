import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateController } from './translate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translate } from './entities/translate.entity';
import { Language } from '../language/entities/language.entity';
import { Definition } from './entities/definition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Translate, Language, Definition])],
  controllers: [TranslateController],
  providers: [TranslateService],
  // exports:[TranslateService]
})
export class TranslateModule { }
