import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';
import { CreateDealDto } from './create-deal.dto';

export class UpdateDealDto extends PartialType(CreateDealDto) {
  @IsOptional()
  deal_name: string;
  @IsOptional()
  price: string;
  @IsOptional()
  description: string;
  @IsOptional()
  deal_picture: string;
  @IsOptional()
  category: [category];
  @IsOptional()
  deal_type: dealType;
}
