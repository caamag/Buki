import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listProducts() {
    const allProducts = await this.prisma.product.findMany();

    if (!allProducts) throw new HttpException('Erro ao buscar produtos.', 400);

    return {
      message: 'Produtos encontrados com sucesso.',
      data: allProducts,
    };
  }
}
