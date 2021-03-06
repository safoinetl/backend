import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CouponDocument } from 'src/schemas/coupon.schema';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { CreateCouponDto } from 'src/dto/coupondto/create-coupon.dto';
import { UpdateCouponDto } from 'src/dto/coupondto/update-coupon.dto';
@Injectable()
export class CouponService {
  constructor(
    @InjectModel('Coupon') private CouponModel: Model<CouponDocument>,
    @InjectModel('User') private UserModel: Model<UserDocument>,
  ) {}

  async createCoupon(createCouponDto: CreateCouponDto, user_id: string) {
    const {
      coupon_name,
      price,
      old_price,
      new_price,
      description,
      category,
      coupon_type,
      date_validation,
      reduc_esti,
      image,
      limit,
    } = createCouponDto;
    const user = await this.UserModel.findById(user_id).exec();
    console.log(user);
    const newCoupon = new this.CouponModel({
      coupon_name,
      price,
      old_price,
      new_price,
      description,
      category,
      coupon_type,
      date_validation,
      reduc_esti,
      created_date: moment().format(),
      limit,
      image,
      user,
    });
    const result = await newCoupon.save();
    await this.UserModel.findByIdAndUpdate(user_id, {
      $push: { coupon: newCoupon },
    }).exec();
    return { result, user };
  }

  findAll() {
    return this.CouponModel.find();
  }

  findOne(coupon_id: string) {
    return this.CouponModel.findById(coupon_id);
  }

  async updateCoupon(
    coupon_id: string,
    updateCouponDto: UpdateCouponDto,
    user_id: string,
  ) {
    const user = await this.UserModel.findById(user_id);
    console.log(user._id);
    const findDeal = await this.CouponModel.findById(coupon_id);
    if (user._id.toString() !== findDeal.user.toString()) {
      console.log({ user, findDeal });
      throw new UnauthorizedException({
        message: 'you are not allowed to make changes',
      });
    }
    const deal = this.CouponModel.findByIdAndUpdate(coupon_id, updateCouponDto);
    return deal;
  }
  async deleteCoupon(coupon_id: string, user_id: string) {
    const user = await this.UserModel.findById(user_id);
    console.log(user._id);
    const findDeal = await this.CouponModel.findById(coupon_id);
    if (!findDeal) {
      throw new NotFoundException({ message: 'Deal not found' });
    }
    if (user._id.toString() !== findDeal.user.toString()) {
      console.log({ user, findDeal });
      throw new UnauthorizedException({
        message: 'you are not allowed to make changes',
      });
    }
    {
      await this.CouponModel.findByIdAndRemove(coupon_id);
      const message = { message: 'deleted succefully' };
      return message;
    }
  }
  async filterByTitle(coupon_name: string) {
    const Find = this.CouponModel.find({
      name: { $regex: coupon_name },
    });
    return Find;
  }
}
