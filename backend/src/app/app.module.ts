import { Module } from '@nestjs/common';

//modules
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
