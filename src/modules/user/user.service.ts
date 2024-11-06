import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(create: CreateUserDto) {
    const conflictUser = await this.userRepository.findOneBy({
      email: create.email,
    });
    if (conflictUser) {
      throw new ConflictException('Email already exists❗');
    }

    const newUser = this.userRepository.create({
      email: create.email,
      firstName: create.firstName,
      lastName: create.lastName,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'Success✅',
      data: newUser,
    };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return {
      message: 'Success✅',
      data: users,
    };
  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    return {
      message: 'Success✅',
      data: findUser,
    };
  }

  async findByEmail(email: string) {
    const findUser = await this.userRepository.findOneBy({ email });

    return {
      message: 'Success✅',
      data: findUser,
    };
  }

  async update(id: number, update: UpdateUserDto) {
    const [findUser, conflictUser] = await Promise.all([
      this.userRepository.findOne({ where: { id } }),
      this.userRepository.findOneBy({ email: update.email }),
    ]);

    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    if (conflictUser) {
      throw new ConflictException('Email already exists❗');
    }

    await this.userRepository.update({ id }, { ...update });

    return {
      message: 'Success✅',
      data: id,
    };
  }

  async remove(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('User not found❗');
    }
    this.userRepository.delete({ id });
    return {
      message: 'Success✅',
      data: id,
    };
  }
}
