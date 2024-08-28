import { Module } from '@nestjs/common';
import { ProductCommandController } from './command/product.controller';
import { ProductQueryController } from './query/product.controller';
import { ProductCommandService } from './command/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './command/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './query/product.schema';
import { ProductQueryService } from './query/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductCommandController, ProductQueryController],
  providers: [ProductCommandService, ProductQueryService],
  exports: [],
})
export class ProductModule {}
