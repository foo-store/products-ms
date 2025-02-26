import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit: number = 10;
}
