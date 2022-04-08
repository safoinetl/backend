import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from '../dto/authDto/auth-credentials.Dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { signInDto } from '../dto/authDto/signin.Dto';
import { role } from '../enum/Role-Enum';
import { JwtPayload } from 'src/Jwt/jwt-payload';
import { sold } from 'src/enum/userSold.enum';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ created: string }> {
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
      ProfilePicture,
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
      ProfilePicture,
      created_date: moment().format(),
      sold: sold.SOLD,
    });
    const user = await this.UserModel.findOne({ email });
    if (user) {
      throw new ConflictException({ message: 'user already exist' });
    } else {
      await newUser.save();
      console.log(newUser);
      const created = 'succed';
      return { created: created };
    }
  }
  async signIn(signinDto: signInDto) {
    const { email, password } = signinDto;
    const users = await this.UserModel.findOne({ email: email });
    const passValidate = await bcrypt.compare(password, users.password);
    if (users && passValidate) {
      /* it will do a comparation between your input and the base de donnees if its true it will return a succed message else it throw an error */
      const user = await this.UserModel.findOne({ email: email });
      const payload: JwtPayload = { email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, users };
    } else {
      throw new UnauthorizedException({
        message: 'please check your information',
      });
    }
  }

  async getCategory() {
    const topic = [
      { _id: '1', value: 'Advice' },
      { _id: '2', value: 'Animals & Awws' },
      { _id: '3', value: 'Anime' },
      { _id: '4', value: 'Art & Design' },
      { _id: '5', value: 'Beauty' },
      { _id: '6', value: 'Diy & Home' },
      { _id: '7', value: 'Entertaiment' },
      { _id: '8', value: 'Fashion' },
      { _id: '9', value: 'Finance & Business' },
      { _id: '10', value: 'Food' },
      { _id: '11', value: 'Funny' },
      { _id: '12', value: 'Gaming' },
      { _id: '13', value: 'Health & Lifestyle' },
      { _id: '14', value: 'Hobbies' },
      { _id: '15', value: 'Livestreams' },
      { _id: '16', value: 'Music' },
      { _id: '17', value: 'News' },
      { _id: '18', value: 'Outdoors' },
      { _id: '19', value: 'Reading & Literature' },
      { _id: '20', value: 'Relationships' },
      { _id: '21', value: 'Education' },
      { _id: '22', value: 'Science' },
      { _id: '23', value: 'Technology' },
      { _id: '24', value: 'Travel' },
      { _id: '25', value: 'Nature' },
      { _id: '26', value: 'Job' },
    ];
    return topic;
  }
  // async getRefreshToken(): Promise<string> {
  //   const userDataToUpdate = {
  //     refreshToken: randomToken.generate(16),
  //     refreshTokenExp: moment().day(4).format('YYYY/MM/DD'),
  //   };
  //   return userDataToUpdate.refreshToken;
  // }
}
