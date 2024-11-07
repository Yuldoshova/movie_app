import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Translate } from './entities/translate.entity';
import { Repository } from 'typeorm';
import { Language } from '../language/entities/language.entity';
import { Definition } from './entities/definition.entity';
import { GetSingleTranslateDto } from './dto/get-single-translate.dto';

@Injectable()
export class TranslateService {

  constructor(
    @InjectRepository(Translate)
    private translateRepository: Repository<Translate>,

    @InjectRepository(Language)
    private languageRepository: Repository<Language>,

    @InjectRepository(Definition)
    private definitionRepository: Repository<Definition>
  ) { }

  async create(create: CreateTranslateDto) {


    const newTraslate = this.translateRepository.create({
      about: create.about,
      type: create.type
    })
    await this.translateRepository.save(newTraslate)
    for (let key of Object.keys(create.definitions)) {
      const findlanguage = await this.languageRepository.findOne({ where: { code: key } })

      if (!findlanguage) {
        throw new NotFoundException(`Language ${key} not found!!!`)
      }

      const newDefinition = this.definitionRepository.create({
        value: create.definitions[key],
        languageId: findlanguage.id,
        translateId: newTraslate.id

      })
      await this.definitionRepository.save(newDefinition)
    }
    return newTraslate
  }

  async findAll() {
    const allTranslates = await this.translateRepository.find()

    return {
      message: "Success✅",
      data: allTranslates
    }
  }

  async findOne(payload: GetSingleTranslateDto) {
    const findTranslate = await this.translateRepository.findOne({ where: { id: payload.translateId } })

    if (!findTranslate) {
      throw new NotFoundException("Translate not found!")
    }

    const findLanguage = await this.languageRepository.findOne({ where: { code: payload.languageCode } })

    const findDefinition = await this.definitionRepository.findOne({
      where: { languageId: findLanguage.id, translateId: payload.translateId }
    })

    if (!findDefinition) {
      return ""
    }
    return findDefinition.value
  }

  async update(id: number, update: UpdateTranslateDto) {
    const findTranslate = await this.translateRepository.findOne({
      where: { id }
    })

    if (!findTranslate) {
      throw new NotFoundException(`Translate not found!!!`)
    }

    await this.definitionRepository.delete({ translateId: findTranslate.id })

    for (let key of Object.keys(update.definitions)) {
      const findlanguage = await this.languageRepository.findOne({ where: { code: key } })

      if (!findlanguage) {
        throw new NotFoundException(`Language ${key} not found!!!`)
      }

      this.definitionRepository.create({
        value: update.definitions[key],
        languageId: findlanguage.id,
        translateId: findTranslate.id

      })
    }

  }

  async remove(id: number) {
    const findTranslate = await this.translateRepository.findOne({
      where: { id }
    })

    if (!findTranslate) {
      throw new NotFoundException(`Translate not found!!!`)
    }
    return await this.translateRepository.delete(id)
  }
}
