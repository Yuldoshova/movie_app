import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UploadService } from '../upload/upload.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TranslateService } from '../translate/translate.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private upload: UploadService,
    private translateService: TranslateService
  ) { }

  async create(payload: CreateCategoryDto) {
    const fileOptions = await this.upload.uploadFile({
      file: payload.image,
      destination: 'uploads',
    });

    const newCategory = this.categoryRepository.create({
      name: payload.name,
      description: payload.description,
      image: fileOptions.imageUrl,
    });
    await this.categoryRepository.save(newCategory)

    return {
      message: 'Success✅',
      data: newCategory,
    };
  }

  async findAll(languageCode: string) {
    const allCategories = await this.categoryRepository.find()
    for (let c of allCategories) {
      const translate = await this.translateService.findOne({
        translateId: parseInt(c.name),
        languageCode
      })
      c.name = translate
    }
    return allCategories
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
