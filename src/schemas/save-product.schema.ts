import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
export type SaveDocument = saveProduct & Document;
@Schema()
export class saveProduct {
  @Prop()
  save_id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
  @Prop()
  product: string[];
  @Prop()
  created: Date;
}
export const saveProductSchema = SchemaFactory.createForClass(saveProduct);
