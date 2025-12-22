import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listProducts() {
    const allProducts = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        author: true,
        widthStar: true,
      },
    });

    if (!allProducts) throw new HttpException('Erro ao buscar produtos.', 400);

    return {
      message: 'Produtos encontrados com sucesso.',
      data: allProducts,
    };
  }

  async showProduct(id: number) {
    if (!Number(id)) throw new HttpException('Id inválido', 400);

    const productSearched = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!productSearched)
      throw new HttpException('Nenhum produto localizado.', 404);

    return {
      message: 'Produto encotrado com sucesso.',
      data: productSearched,
    };
  }

  async createProduct(body: CreateProductDto) {
    if (!body)
      throw new HttpException('Informe todos os dados do produto.', 400);

    const verifyNameExist = await this.prisma.product.findFirst({
      where: {
        name: body.name,
      },
    });

    if (verifyNameExist)
      throw new HttpException(
        'Já existe um produto cadastrado com este nome',
        400,
      );

    const newProduct = await this.prisma.product.create({
      data: body,
    });

    return {
      message: 'Produto criado com sucesso.',
      data: newProduct,
    };
  }

  async deleteProduct(id: number) {
    if (!Number(id)) throw new HttpException('Id inválido', 400);

    const productToDelete = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!productToDelete)
      throw new HttpException('Produto não encontrado.', 404);

    await this.prisma.product.delete({
      where: {
        id: productToDelete.id,
      },
    });

    return {
      message: `Produto [${productToDelete.name}] deletado com sucesso.`,
    };
  }

  async updateProduct(id: number, body: UpdateProductDto) {
    const productToUpdate = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!productToUpdate)
      throw new HttpException('Nenhum produto encontrado.', 404);

    if (body.name) {
      const verifyNameExist = await this.prisma.product.findFirst({
        where: {
          name: body.name,
          id: {
            not: id,
          },
        },
      });

      if (verifyNameExist) {
        throw new HttpException(
          'Já existe outro produto cadastrado com este nome.',
          400,
        );
      }
    }

    const updatedProduct = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: body,
    });

    return {
      message: 'Produto atualizado com sucesso.',
      data: updatedProduct,
    };
  }
}
