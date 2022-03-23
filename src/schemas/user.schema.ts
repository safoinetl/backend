import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { address, education, links, professional } from 'src/dto/fields/fields';
import { gender } from 'src/enum/gender-enum';
import { role } from 'src/enum/Role-Enum';

import { v4 as uuid } from 'uuid';
import { Deal } from './deal.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  // @Prop({
  //   type: String,
  //   default: function genUUID() {
  //     return uuid();
  //   },
  // })
  // user_id2: string;
  // @Prop()
  // user_id: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop({ required: true, unique: true })
  phone: number;
  @Prop({ nullable: true })
  interests: [];
  @Prop({ nullable: true })
  specialities: [];
  @Prop({ nullable: true })
  ProfilePicture: string;
  @Prop({ type: String, enum: role, default: 'user' })
  role: role;
  @Prop()
  Brand_Name: string;
  @Prop()
  M_F: string;
  @Prop()
  short_bio: string;
  @Prop()
  long_bio: string;
  @Prop()
  education: education;
  @Prop()
  professional: professional;
  @Prop()
  pseudo: string;
  @Prop()
  status: string;
  @Prop()
  birthDate: Date;
  @Prop({ type: String, enum: gender })
  gender: gender;
  @Prop()
  address: address;
  @Prop()
  links: links;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Deal })
  deal: Deal[];
}
export const UserSchema = SchemaFactory.createForClass(User);
