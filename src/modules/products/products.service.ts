import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto';
import { PaginationService } from 'src/common/modules/pagination/pagination.service';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  constructor(private readonly paginationService: PaginationService) {
    super();
  }

  async getProducts(paginationDto: PaginationDto) {
    const pagination = this.paginationService.generate(
      paginationDto.page,
      paginationDto.limit,
    );

    const data = await this.product.findMany({ ...pagination });
    const total = await this.product.count();

    return this.paginationService.create(paginationDto, data, total);
  }
}
