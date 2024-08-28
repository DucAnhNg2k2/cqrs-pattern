import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueService } from 'src/module/queue/queue.service';

@Injectable()
export class ProductCommandService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private queueService: QueueService,
    private dataSource: DataSource,
  ) {}

  async createProduct(dto: CreateProductDto) {
    // create-transaction:
    return this.dataSource.transaction(async (manager) => {
      const product = await manager.insert(ProductEntity, {
        id: null,
        name: dto.name,
        price: dto.price,
        description: dto.description,
      });
      if (product.identifiers.length) {
        await this.queueService.publish({
          id: product.identifiers[0].id,
          name: dto.name,
          price: dto.price,
          description: dto.description,
        });
        return true;
      }
      return false;
    });
  }
}
