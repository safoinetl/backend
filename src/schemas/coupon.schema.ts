import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';
import { User } from './user.schema';

export type CouponDocument = Coupon & Document;
@Schema()
export class Coupon {
  @Prop()
  coupon_name: string;
  @Prop()
  old_price: string;
  @Prop()
  new_price: string;
  @Prop()
  description: string;
  @Prop()
  deal_picture: string;
  @Prop()
  category: [category];
  @Prop()
  coupon_type: dealType;
  @Prop()
  date_validation: Date;
  @Prop()
  created_date: Date;
  @Prop()
  reduc_esti: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
}
export const CouponSchema = SchemaFactory.createForClass(Coupon);
