import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DealSchema } from 'src/schemas/deal.schema';
import { JwtStrategy } from 'src/Jwt/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Deal', schema: DealSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    UserModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DealController],
  providers: [DealService],
  exports: [],
})
export class DealModule {}
