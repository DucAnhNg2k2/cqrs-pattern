import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCommandService } from './product.service';

@Controller('products')
export class ProductCommandController {
  constructor(private readonly productCommandService: ProductCommandService) {}

  @Post('')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productCommandService.createProduct(dto);
  }
}
