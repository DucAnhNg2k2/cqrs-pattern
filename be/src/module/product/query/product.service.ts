import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { QueueService } from 'src/module/queue/queue.service';

@Injectable()
export class ProductQueryService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private queueService: QueueService,
  ) {}

  async onModuleInit() {
    this.asyncProduct();
  }

  async getProducts() {
    return this.productModel.find();
  }

  private asyncProduct() {
    return this.queueService.subscribe(async (job) => {
      const data = job.data;
      await this.productModel.create({
        productId: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
      });
    });
  }
}
