import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Deal } from 'src/schemas/deal.schema';
import { User } from 'src/schemas/user.schema';


export interface addToCart {
    deal: Deal;
    
}
export type CouponDocument = cart & Document;
@Schema()
export class cart {
  @Prop()
  ordre_id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
}
