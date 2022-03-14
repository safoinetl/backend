import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enum/Role-Enum';
import { BeforeInsert } from 'typeorm';
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
  @Prop()
  interest: [];
  @Prop()
  speciality: [];
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
  @Prop({ nullable: true })
  ProfilePicture: string;
  @Prop({ type: String, enum: Role, default: 'user' })
  Role: Role;
  @Prop({ nullable: true, unique: true })
  Brand_Name: string;
  @Prop({ nullable: true, unique: true })
  M_F: string;
  @Prop()
  short_bio: string;
  @Prop()
  long_bio: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
