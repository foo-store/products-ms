import { Module } from '@nestjs/common';
import { PaginationModule } from './common/modules/pagination/pagination.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [ProductsModule, PaginationModule],
})
export class AppModule {}
