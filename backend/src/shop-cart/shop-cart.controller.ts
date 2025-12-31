import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('api/shop-cart')
export class ShopCartController {
  constructor(private readonly shopCartService: ShopCartService) {}

  @Post()
  createCartItem(@Body() body: CreateCartDto) {
    return this.shopCartService.addItemToCart(
      Number(body.userId),
      Number(body.productId),
      Number(body.quantity),
    );
  }

  @Delete()
  clearCart(@Query('user-id') userId: string) {
    return this.shopCartService.clearAllCart(Number(userId));
  }

  @Delete(':id')
  removeCartItem(@Param('id') id: string) {
    return this.shopCartService.removeItemFromCart(Number(id));
  }
}
