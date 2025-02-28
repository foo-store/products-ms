import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto';
import { CreateProductDto } from './dto';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('product.create')
  async createProduct(@Payload() productDto: CreateProductDto) {
    return await this.productsService.create(productDto);
  }

  @MessagePattern('product.list')
  async getProducts(@Payload() paginationDto: PaginationDto) {
    return await this.productsService.getAll(paginationDto);
  }

  @MessagePattern('product.verify')
  async verifyProduct(@Payload() productsId: number[]) {
    return await this.productsService.verify(productsId);
  }
}
