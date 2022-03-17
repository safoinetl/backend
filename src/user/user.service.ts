import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { query } from 'express';
import { Model } from 'mongoose';
import { switchMap, from, Observable } from 'rxjs';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { GetProfileFilterDto } from 'src/dto/getProfileFilter.dto';
import { UserDocument, User } from 'src/schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {} // @InjectModel('User') private readonly userModel: Model<UserDocument>,
  async getAllProfiles(
    GetProfileFilterDto: GetProfileFilterDto,
  ): Promise<User> {
    const users = new this.UserModel();
    return users;
  }

  async findUserById(user_id: string): Promise<User> {
    const getUser = await this.UserModel.findOne({ where: { user_id } });
    if (!getUser) {
      throw new NotFoundException();
    }
    delete getUser.password;
    return getUser;
  }
  // async updateOne(user: any): Promise<User> {
  //   return await this.UserModel.findByIdAndUpdate(
  //     user.user_id,
  //     user.profilePicture,
  //     {
  //       new: true,
  //     },
  //   );
  // }
  updateOne(user_id: string, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.role;

    return from(this.UserModel.update(user)).pipe(
      switchMap(() => this.findUserById(user_id)),
    );
  }
}
//   const query = this.createQueryBuilder('User');
//   if (search) {
//     query.andWhere(
//        'LOWER(user.name) LIKE LOWER(:search) OR LOWER(user.surname) LIKE LOWER(:search)' ,
//       // for the sensitive input and just keep the parenthese cuzz it make a mistake when we do fetch tasks for users
//       {
//         search: `%${search}%`,
//       } /*% let us to make the search caracter par caracter thats mean no need to entre the whole word to search for it */,
//     );
//   }
//   try {
//     const user = await query.getMany();
//     return user;
//   } catch (error) {
//   throw new error();
//   }
// }
