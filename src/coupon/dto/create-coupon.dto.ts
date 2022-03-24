import { IsString } from 'class-validator';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';

export class CreateCouponDto {
  @IsString()
  coupon_name: string;
  @IsString()
  old_price: string;
  @IsString()
  new_price: string;
  @IsString()
  description: string;
  @IsString()
  deal_picture: string;
  @IsString()
  category: [category];
  @IsString()
  coupon_type: dealType;
  @IsString()
  date_validation: Date;
  @IsString()
  created_date: Date;
  @IsString()
  reduc_esti: string;
}
