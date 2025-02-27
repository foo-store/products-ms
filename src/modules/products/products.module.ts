import { Module } from '@nestjs/common';
import { PaginationModule } from 'src/common/modules/pagination/pagination.module';
import { natsProvider } from 'src/common/providers/nats.provider';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, natsProvider],
  imports: [PaginationModule],
})
export class ProductsModule {}
