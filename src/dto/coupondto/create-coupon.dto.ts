import { IsDate, IsOptional, IsString } from 'class-validator';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';

export class CreateCouponDto {
  @IsString()
  price: number;
  @IsString()
  coupon_name: string;
  @IsString()
  old_price: number;
  @IsString()
  new_price: number;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  category: [category];
  @IsString()
  coupon_type: dealType;
  @IsString()
  date_validation: string;
  @IsString()
  reduc_esti: string;
  @IsString()
  limit: number;
}
