import { Controller, Get } from '@nestjs/common';
import { ProductQueryService } from './product.service';

@Controller('products')
export class ProductQueryController {
  constructor(private productQueryService: ProductQueryService) {}

  @Get('')
  getProducts() {
    return this.productQueryService.getProducts();
  }
}
