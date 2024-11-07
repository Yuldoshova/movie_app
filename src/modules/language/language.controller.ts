import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Language")
@Controller("languages")
export class LanguageController {
  constructor(private readonly languageService: LanguageService) { }

  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createLanguageDto: CreateLanguageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.languageService.create({ ...createLanguageDto, image });
  }

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languageService.update(id, updateLanguageDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.languageService.remove(id);
  }
}
