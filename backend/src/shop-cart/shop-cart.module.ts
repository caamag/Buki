import { Module } from '@nestjs/common';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartService } from './shop-cart.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShopCartController],
  providers: [ShopCartService],
})
export class ShopCartModule {}
