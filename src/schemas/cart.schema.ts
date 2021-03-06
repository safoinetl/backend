import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
export type CartDocument = Cart & Document;
@Schema()
export class Cart {
  @Prop()
  cart_id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
  @Prop()
  products: string[];
  @Prop()
  totalPrice: number;
  @Prop()
  created: Date;
}
export const CartSchema = SchemaFactory.createForClass(Cart);
