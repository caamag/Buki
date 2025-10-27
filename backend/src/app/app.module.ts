import { Module } from '@nestjs/common';

//modules
import { ProductsModule } from 'src/products/products.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
})
export class AppModule {}
