import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto';
import { PaginationService } from 'src/common/modules/pagination/pagination.service';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
    private readonly paginationService: PaginationService) {
    super();
  }

  async create(createProductDto: CreateProductDto) {
    const { quantity, ...rest } = createProductDto;

    try {

      const newProduct = await this.product.create({ data: rest });

      this.clientProxy.emit("product.created", {
        productId: newProduct.id,
        quantity,
      });

      return newProduct;

    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message,
      })
    }


  }

  async getAll(paginationDto: PaginationDto) {
    const pagination = this.paginationService.generate(
      paginationDto.page,
      paginationDto.limit,
    );

    const data = await this.product.findMany({ ...pagination });
    const total = await this.product.count();

    return this.paginationService.create(paginationDto, data, total);
  }
}
