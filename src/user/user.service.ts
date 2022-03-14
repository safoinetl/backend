import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(user_id: string) {
    const getUser = await this.userModel.findOne({ where: { user_id } });
    if (!getUser){
      throw new NotFoundException();
    }
    delete getUser.password;
    return getUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
