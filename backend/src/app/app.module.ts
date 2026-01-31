import { Module } from '@nestjs/common';

//modules
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { ShopCartModule } from '../shop-cart/shop-cart.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule, ShopCartModule],
  controllers: [AppController],
})
export class AppModule {}
