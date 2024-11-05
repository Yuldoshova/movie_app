import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserService } from '@modules';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/add')
  create(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.userService.create(createUserDto);
  }

  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/single/:id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.findOne(+id);
  }

  @Patch('/update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/remove/:id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.remove(id);
  }
}
