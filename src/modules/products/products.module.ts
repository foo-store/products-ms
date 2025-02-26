import { Module } from '@nestjs/common';
import { PaginationModule } from 'src/common/modules/pagination/pagination.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PaginationModule],
})
export class ProductsModule {}
