import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { PaginationDto } from 'src/common/dto';
import { CreateProductDto } from './dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('product.create')
  createProduct(@Payload() productDto: CreateProductDto) {
    return this.productsService.create(productDto);
  }

  @MessagePattern('product.list')
  getProducts(@Payload() paginationDto: PaginationDto) {
    return this.productsService.getAll(paginationDto);
  }
}
