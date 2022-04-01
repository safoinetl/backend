import { InternalServerErrorException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { query } from 'express';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { getDealsfiltersDto } from 'src/dto/dealFilter.dto';
import { UpdateProfileDto } from 'src/dto/updating_profile_info.dto';
import { category } from 'src/enum/category-enum';
import { UserDocument, User } from 'src/schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}
  async updateProfile(data: UpdateProfileDto, user_id: string) {
    const update = await this.UserModel.findByIdAndUpdate(user_id, data);

    if (!update) {
      throw new NotFoundException({ message: 'user not found' });
    }
    return update;
  }

  findOne(user: User) {
    return this.UserModel.findOne(user);
  }
  getImage(ProfilePicture: string) {
    const getimage = this.UserModel.findOne({ ProfilePicture });
    return getimage;
  }




  
}
