import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCommandService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const result = await this.productRepository.insert({
      id: null,
      name: dto.name,
      price: dto.price,
      description: dto.description,
    });
    if (result.identifiers.length > 0) {
      return true;
    }
    return false;
  }
}
