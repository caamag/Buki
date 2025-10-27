import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  returnHello() {
    return 'Hello! this is a Buki API';
  }
}
