import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { address, education, links, professional } from 'src/dto/fields/fields';
import { gender } from 'src/enum/gender-enum';
import { role } from 'src/enum/Role-Enum';

import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({
    type: String,
    default: function genUUID() {
      return uuid();
    },
  })
  user_id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
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
}
export const UserSchema = SchemaFactory.createForClass(User);
