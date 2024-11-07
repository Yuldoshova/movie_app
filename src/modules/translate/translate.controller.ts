import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetSingleTranslateDto } from './dto/get-single-translate.dto';

@ApiTags("Translate")
@Controller("translates")
export class TranslateController {
  constructor(private readonly translateService: TranslateService) { }

  @Post("/add")
  create(@Body() createTranslateDto: CreateTranslateDto) {
    return this.translateService.create(createTranslateDto);
  }

  @Get('/all')
  findAll() {
    return this.translateService.findAll();
  }

  @Get('/single')
  findOne(
    @Body() payload: GetSingleTranslateDto
  ) {
    return this.translateService.findOne(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslateDto: UpdateTranslateDto) {
    return this.translateService.update(+id, updateTranslateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translateService.remove(+id);
  }
}
