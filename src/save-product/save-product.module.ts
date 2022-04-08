import { Module } from '@nestjs/common';
import { SaveProductService } from './save-product.service';
import { SaveProductController } from './save-product.controller';
import { saveProductSchema } from 'src/schemas/save-product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { CouponSchema } from 'src/schemas/coupon.schema';
import { DealSchema } from 'src/schemas/deal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'saveProduct', schema: saveProductSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Deal', schema: DealSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Coupon', schema: CouponSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SaveProductController],
  providers: [SaveProductService],
})
export class SaveProductModule {}
