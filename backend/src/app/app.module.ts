import { Module } from '@nestjs/common';

//modules
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
