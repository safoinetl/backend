import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Coupon } from 'src/schemas/coupon.schema';
import { Deal } from 'src/schemas/deal.schema';
import { User } from 'src/schemas/user.schema';
export interface addToCart {
  deal: string;
  coupon: string;
  quantity: number;
}
export type CartDocument = Cart & Document;
@Schema()
export class Cart {
  @Prop()
  cart_id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
  @Prop()
  products: addToCart[];
  @Prop()
  totalPrice: number;
  @Prop()
  created: Date;
}
export const CartSchema = SchemaFactory.createForClass(Cart);
