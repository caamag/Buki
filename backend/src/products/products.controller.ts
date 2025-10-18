import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  listProducts() {
    return this.service.listProducts();
  }

  @Get(':id')
  showProduct(@Param('id') id: string) {
    return this.service.showProduct(Number(id));
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.service.createProduct(body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.service.deleteProduct(Number(id));
  }

  @Patch(':id')
  updateProduct(@Body() body: UpdateProductDto, @Param('id') id: string) {
    return this.service.updateProduct(Number(id), body);
  }
}
