import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { type IncomingHttpHeaders } from 'http';
import { Headers } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/me')
  findUser(@Headers() headers: IncomingHttpHeaders) {
    return this.service.searchCurrentUser(headers);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(Number(id), body);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(Number(id));
  }
}
