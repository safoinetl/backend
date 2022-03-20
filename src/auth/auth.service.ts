import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { signInDto } from '../dto/signin.Dto';
import { role } from '../enum/Role-Enum';
import { JwtPayload } from 'src/Jwt/jwt-payload';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const {
      email,
      password,
      name,
      surname,
      phone,
      interests,
      specialities,
      role,
      Brand_Name,
      M_F,
      short_bio,
      long_bio,
    } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.UserModel({
      email,
      password: hashedPassword,
      name,
      surname,
      phone,
      interests,
      specialities,
      role,
      Brand_Name,
      M_F,
      short_bio,
      long_bio,
    });
    const user = await this.UserModel.findOne({ email });
    if (user) {
      throw new ConflictException({ message: 'user already exist' });
      // throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    } else {
      await newUser.save();
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      console.log(newUser.user_id);
      return { accessToken };
    }
  }
  async signIn(signinDto: signInDto) {
    const { email, password } = signinDto;
    const user = this.UserModel.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, (await user).password))) {
      const payload: JwtPayload = { email };
      // delete (await user).password;
      // delete (await user).user_id;
      const accessToken = await this.jwtService.sign(payload);
      console.log(email);
      const info = { accessToken };
      return info;
    } else {
      throw new UnauthorizedException('please check your information');
    }
  }
}
