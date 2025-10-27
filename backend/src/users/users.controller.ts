import { Controller, Param } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  @Get(':id')
  findUser(@Param('id') id: string) {
    return id + ' users';
  }
}
