import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';
import { v4 as uuid } from 'uuid';
export type DealDocument = Deal & Document;
@Schema()
export class Deal {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuid();
    },
  })
  deal_id: string;
  @Prop()
  deal_name: string;
  @Prop()
  price: string;
  @Prop()
  description: string;
  @Prop()
  deal_picture: string;
  @Prop()
  category: [category];
  @Prop()
  deal_type: dealType;
  @Prop()
  date: Date;
}
export const DealSchema = SchemaFactory.createForClass(Deal);
