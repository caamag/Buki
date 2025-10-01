import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('/api/products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  listProducts() {
    return this.service.listProducts();
  }
}
