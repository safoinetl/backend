import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DealModule } from './deal/deal.module';
import { CouponModule } from './coupon/coupon.module';
import { CartModule } from './cart/cart.module';
import { SaveProductModule } from './save-product/save-product.module';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://pestoree:pestore2022@cluster0.gtbrm.mongodb.net/pestoree?retryWrites=true&w=majority',
    ),
    UserModule,
    DealModule,
    CouponModule,
    CartModule,
    SaveProductModule,
  ],
})
export class AppModule {}
