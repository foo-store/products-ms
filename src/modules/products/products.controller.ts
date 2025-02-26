import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { PaginationDto } from 'src/common/dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('get-products')
  getProducts(@Payload() paginationDto: PaginationDto) {
    return this.productsService.getProducts(paginationDto);
  }
}
