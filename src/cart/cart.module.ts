import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema } from 'src/schemas/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DealSchema } from 'src/schemas/deal.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { CouponSchema } from 'src/schemas/coupon.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    MongooseModule.forFeature([{ name: 'Deal', schema: DealSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
