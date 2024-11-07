import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private upload: UploadService
  ) { }


  async create(payload: CreateLanguageDto) {
    const fileOptions = await this.upload.uploadFile({
      file: payload.image,
      destination: 'uploads',
    });
    const newLanguage = this.languageRepository.create({
      code: payload.code,
      title: payload.title,
      image: fileOptions.imageUrl
    })
    return {
      message: "Success✅",
      data: newLanguage
    }
  }

  async findAll() {
    const languages = await this.languageRepository.find()
    return {
      message: "Success✅",
      data: languages
    }
  }

  async findOne(id: number) {
    const findLanguage = await this.languageRepository.findOne({ where: { id } })
    if (!findLanguage) {
      throw new NotFoundException("Language not found!")
    }
    return {
      message: "Success✅",
      data: findLanguage
    }
  }

  async update(id: number, update: UpdateLanguageDto) {
    const findLanguage = await this.languageRepository.findOne({ where: { id } })
    if (!findLanguage) {
      throw new NotFoundException("Language not found!")
    }
    const updatedLanguage = await this.languageRepository.update({ id }, { ...update })
    return {
      message: "Success✅",
      data: updatedLanguage
    }
  }

  async remove(id: number) {
    const findLanguage = await this.languageRepository.findOne({ where: { id } })
    if (!findLanguage) {
      throw new NotFoundException("Language not found!")
    }
    await this.languageRepository.delete(id)
    return {
      message: "Success✅",
      data: findLanguage
    }
  }
}
