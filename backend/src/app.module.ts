import { Module } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";

@Controller()
class AppController {
  @Get()
  getHello(): string {
    return "Olá Mundo!";
  }
}

@Module({
  controllers: [AppController],
})
export class AppModule {}
