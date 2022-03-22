import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { JwtPayload } from './jwt-payload';
import { User, UserDocument } from 'src/schemas/user.schema';
@Injectable()
export class JwtStrategySignin extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {
    super({
      secretOrKey: 'pestore2022', //imported from env
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('login in first');
    }
    return user;
  }
}
