import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, User } from '@modules';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(create: CreateUserDto) {

    const newUser = await this.userRepository.create(create)
    return {
      message: "Success✅",
      data: newUser
    }
  }

  async findAll() {
    const users = await this.userRepository.find()
    return {
      message: "Success✅",
      data: users
    }
  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } })
    if (!findUser) {
      throw new NotFoundException("User not found❗")
    }
    return {
      message: "Success✅",
      data: findUser
    }
  }

  async update(id: number, update: UpdateUserDto) {
    const findUser = await this.userRepository.findOne({ where: { id } })
    if (!findUser) {
      throw new NotFoundException("User not found!")
    }
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } })
    if (!findUser) {
      throw new NotFoundException("User not found!")
    }
    return `This action removes a #${id} user`;
  }
}
