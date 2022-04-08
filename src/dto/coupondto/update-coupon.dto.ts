import { IsOptional } from 'class-validator';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';

export class UpdateCouponDto {
  @IsOptional()
  price: number;
  @IsOptional()
  coupon_name: string;
  @IsOptional()
  old_price: number;
  @IsOptional()
  new_price: number;
  @IsOptional()
  description: string;
  @IsOptional()
  image: string[];
  @IsOptional()
  category: [category];
  @IsOptional()
  coupon_type: dealType;
  @IsOptional()
  date_validation: Date;
  @IsOptional()
  created_date: Date;
  @IsOptional()
  reduc_esti: string;
  @IsOptional()
  limit: number;
}
