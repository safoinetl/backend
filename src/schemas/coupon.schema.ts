import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';
import { User } from './user.schema';

export type CouponDocument = Coupon & Document;
@Schema()
export class Coupon {
  @Prop()
  price: number;
  @Prop()
  coupon_id: mongoose.Schema.Types.ObjectId;
  @Prop()
  coupon_name: string;
  @Prop()
  old_price: number;
  @Prop()
  new_price: number;
  @Prop()
  description: string;
  @Prop()
  category: [category];
  @Prop()
  coupon_type: dealType;
  @Prop()
  date_validation: string;
  @Prop()
  created_date: Date;
  @Prop()
  reduc_esti: string;
  @Prop()
  images: string[];
  @Prop()
  limit: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
}
export const CouponSchema = SchemaFactory.createForClass(Coupon);
