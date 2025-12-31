import { Module } from '@nestjs/common';

//modules
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AppController } from './app.controller';
import { ShopCartModule } from 'src/shop-cart/shop-cart.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule, ShopCartModule],
  controllers: [AppController],
})
export class AppModule {}
