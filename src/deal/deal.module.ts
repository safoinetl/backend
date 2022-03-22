import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DealSchema } from 'src/schemas/deal.schema';
import { JwtStrategy } from 'src/Jwt/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Deal', schema: DealSchema }]),
    PassportModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DealController],
  providers: [DealService],
  exports: [],
})
export class DealModule {}
