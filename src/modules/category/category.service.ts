import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UploadService } from '../upload/upload.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private upload: UploadService,
  ) {}

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

    return {
      message: 'Success✅',
      data: newCategory,
    };
  }

  findAll() {
    return `This action returns all category`;
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
