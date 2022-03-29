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
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { sold } from 'src/enum/userSold.enum';
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
      sold: sold.SOLD,
    });
    const user = await this.UserModel.findOne({ email });
    if (user) {
      throw new ConflictException({ message: 'user already exist' });
      // throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
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
    //const passValidate = bcrypt.compare(password, users.password);
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
    return {
      ADVICE: 'Advice',
      ANIMALS_AWWS: 'Animals & Awws',
      ANIME: 'Anime',
      ARTANDDESIGN: 'Art & Design',
      BEAUTY: 'Beauty',
      DIYANDHOME: 'Diy & Home',
      ENTERTAIMENT: 'Entertaiment',
      FASHION: 'Fashion',
      FINANCEANDBUSINESS: 'Finance & Business',
      FOOD: 'Food',
      FUNNY: 'Funny',
      GAMING: 'Gaming',
      HEALTHANDLIFESTYLE: 'Health & Lifestyle',
      HOBBIES: 'Hobbies',
      LIVESTREAMS: 'Livestreams',
      MUSIC: 'Music',
      NEWS: 'News',
      OUTDOORS: 'Outdoors',
      READINANDLITERATURE: 'Reading & Literature',
      RELATIONSHIPS: 'Relationships',
      EDUCATION: 'Education',
      SCIENCE: 'Science',
      SPORTS: 'Technology',
      TRAVEL: 'Travel',
      NATURE: 'Nature',
      JOB: 'Job',
    };
  }
  // async getRefreshToken(): Promise<string> {
  //   const userDataToUpdate = {
  //     refreshToken: randomToken.generate(16),
  //     refreshTokenExp: moment().day(4).format('YYYY/MM/DD'),
  //   };
  //   return userDataToUpdate.refreshToken;
  // }
}
