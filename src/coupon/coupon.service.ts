import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponDocument } from 'src/schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
@Injectable()
export class CouponService {
  constructor(
    @InjectModel('Coupon') private CouponModel: Model<CouponDocument>,
    @InjectModel('User') private UserModel: Model<UserDocument>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const {
      coupon_name,
      old_price,
      new_price,
      description,
      deal_picture,
      category,
      coupon_type,
      date_validation,
      created_date,
      reduc_esti,
      userId
    } = createCouponDto;
    const user = await this.UserModel.findOne({ userId }).exec();
    const newCoupon = new this.CouponModel({
      coupon_name,
      old_price,
      new_price,
      description,
      deal_picture,
      category,
      coupon_type,
      date_validation,
      created_date,
      reduc_esti,
    });
    try {
      console.log(user);
      await newCoupon.save();
      await this.UserModel.findByIdAndUpdate(userId, {
        $push: { coupon: newCoupon },
      }).exec();
      return newCoupon;
    } catch (error) {
      throw new InternalServerErrorException('check your details');
    }
    return null;
  }

  findAll() {
    return `This action returns all coupon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
