import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { query } from 'express';
import { Model } from 'mongoose';
import { switchMap, from, Observable } from 'rxjs';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { GetProfileFilterDto } from 'src/dto/getProfileFilter.dto';
import { UpdateProfileDto } from 'src/dto/updating_profile_info.dto';
import { UserDocument, User } from 'src/schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {} // @InjectModel('User') private readonly userModel: Model<UserDocument>,
  // async getAllProfiles(
  //   GetProfileFilterDto: GetProfileFilterDto,
  // ): Promise<User> {
  //   const users = new this.UserModel();
  //   return users;
  // }
  async findUserById(user_id: string): Promise<User> {
    return this.UserModel.findOne({ where: { user_id } });
  }

  async updateProfile(user_id: string, data: UpdateProfileDto) {
    await this.UserModel.updateOne({ user_id }, data);
    return this.findUserById(user_id);
  }


  // async findUserById(user_id: string): Promise<User> {
  //   const getUser = await this.UserModel.findOne({ where: { user_id } });
  //   if (!getUser) {
  //     throw new NotFoundException();
  //   }
  //   delete getUser.password;
  //   return getUser;
  // }
  // async profilePic(ProfilePicture: any, user_id: string): Promise<User> {
  //   return this.UserModel.findByIdAndUpdate(
  //     { user_id },
  //     { ProfilePicture },
  //     (err) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //     },
  //   );
  // }
  // async updateOne(user: any): Promise<User> {
  //   return await this.UserModel.findByIdAndUpdate(
  //     user.user_id,
  //     user.profilePicture,
  //     {
  //       new: true,
  //     },
  //   );
  // }
//  updateOne(user_id: string, user: User): Observable<any> {
//     delete user.email;
//     delete user.password;
//     delete user.role;

//     return from(this.UserModel.update(user)).pipe(
//       switchMap(() => this.findUserById(user_id)),
//     );
//   }
}
