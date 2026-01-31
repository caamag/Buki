import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShopCartService {
  constructor(private readonly prisma: PrismaService) {}

  async addItemToCart(userId: number, productId: number, quantity: number) {
    if (!userId || !productId || !quantity)
      throw new HttpException('Parâmetros inválidos.', 400);

    if (quantity <= 0)
      throw new HttpException('Quantidade deve ser maior que zero.', 400);

    const productExists = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) throw new HttpException('Produto não encontrado.', 404);

    const cartExists = await this.prisma.shoppingCart.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (cartExists) {
      await this.prisma.shoppingCart.update({
        where: {
          id: cartExists.id,
        },
        data: {
          quantity: cartExists.quantity + quantity,
        },
      });
      return {
        message: 'Item atualizado no carrinho com sucesso.',
      };
    }

    await this.prisma.shoppingCart.create({
      data: {
        userId: userId,
        productId: productId,
        quantity: quantity,
      },
    });

    return {
      message: 'Item adicionado ao carrinho com sucesso.',
    };
  }

  async clearAllCart(userId: number) {
    await this.prisma.shoppingCart.deleteMany({
      where: {
        userId: userId,
      },
    });

    return {
      message: 'Carrinho limpo com sucesso.',
    };
  }

  async removeItemFromCart(id: number) {
    if (!id) throw new HttpException('Parâmetros inválidos.', 400);

    const cartItem = await this.prisma.shoppingCart.findFirst({
      where: {
        id: id,
      },
    });

    if (!cartItem)
      throw new HttpException('Item do carrinho não encontrado.', 404);

    await this.prisma.shoppingCart.delete({
      where: {
        id: cartItem.id,
      },
    });

    return {
      message: 'Item removido do carrinho com sucesso.',
    };
  }
}
