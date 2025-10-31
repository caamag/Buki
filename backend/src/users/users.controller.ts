import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.service.searchUserById(Number(id));
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(Number(id), body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(Number(id));
  }
}
