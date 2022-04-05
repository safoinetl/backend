import { IsOptional } from 'class-validator';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';

export class UpdateCouponDto {
  @IsOptional()
  coupon_name: string;
  @IsOptional()
  old_price: string;
  @IsOptional()
  new_price: string;
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
  limit: string;
}
