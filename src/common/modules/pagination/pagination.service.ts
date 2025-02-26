import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class PaginationService {
  generate(page: number, limit: number) {
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  create<T>(paginationDto: PaginationDto, data: T, total: number) {

    const totalPages = Math.ceil(total / paginationDto.limit);

    return {
      meta: {
        page: paginationDto.page,
        limit: paginationDto.limit,
        total,
        totalPages
      },
      data,
    };
  }
}
