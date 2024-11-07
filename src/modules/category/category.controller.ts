import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Headers
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/utils/decorators/role.decorator';
import { Protected } from 'src/utils/decorators/protected.decorator';
import { UserRoles } from 'src/utils/enums/user-role.enum';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.categoryService.create({ ...createCategoryDto, image });
  }

  @Get('/all')
  findAll(
    @Headers("accept-headers") languageCode: string
  ) {
    return this.categoryService.findAll(languageCode);
  }

  @Get('/single/:id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.categoryService.findOne(id);
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('/remove/:id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.categoryService.remove(id);
  }
}
