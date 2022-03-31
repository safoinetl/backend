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
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {} // @InjectModel('User') private readonly userModel: Model<UserDocument>,
  // async getAllProfiles(
  //   GetProfileFilterDto: GetProfileFilterDto,
  // ): Promise<User[]> {
  //   const users = new this.UserModel();
  //   return users;
  // }

  // async findUserById(userId: string): Promise<User> {
  //   return this.UserModel.findOne({ userId: userId });

  async updateProfile(data: UpdateProfileDto, user_id: string) {
    const update = await this.UserModel.findByIdAndUpdate(user_id, data);

    if (!update) {
      throw new NotFoundException();
    }
    return update;
  }

  findOne(user: User) {
    // const resultat = this.UserModel.find();
    // return resultat;
    return this.UserModel.findOne(user);
  }
}
