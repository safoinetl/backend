import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponSchema } from 'src/schemas/coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
