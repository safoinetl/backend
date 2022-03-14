import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { signInDto } from './dto/signin.Dto';
import { role } from './enum/Role-Enum';
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
      Role,
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
      Role,
      Brand_Name,
      M_F,
      short_bio,
      long_bio,
    });
    const user = await this.UserModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    } else {
      await newUser.save();
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new InternalServerErrorException('something goes wrong');
  }
  async signIn(signinDto: signInDto): Promise<{ accessToken: string }> {
    const { email, password } = signinDto;
    const user = this.UserModel.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, (await user).password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('please check your information');
    }
  }
}
