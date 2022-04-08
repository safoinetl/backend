import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { DealDocument } from 'src/schemas/deal.schema';
import { CouponDocument } from 'src/schemas/coupon.schema';
import { SaveDocument } from 'src/schemas/save-product.schema';
import * as moment from 'moment';
@Injectable()
export class SaveProductService {
  constructor(
    @InjectModel('saveProduct') private saveProductModel: Model<SaveDocument>,
    @InjectModel('Coupon') private CouponModel: Model<CouponDocument>,
    @InjectModel('User') private UserModel: Model<UserDocument>,
    @InjectModel('Deal') private DealModel: Model<DealDocument>,
  ) {}
  async createSave(user_id: string, coupon_id: string, deal_id: string) {
    const findDeal = await this.DealModel.findById(deal_id).exec();
    const findCoupon = await this.CouponModel.findById(coupon_id).exec();
    const user = await this.UserModel.findById(user_id).exec();
    if (!findDeal) {
      if (!findCoupon) {
        throw new NotFoundException({ message: 'product Not Found' });
      }
      const newSave = await new this.saveProductModel({
        product: findCoupon,
        user,
        created: moment().format(),
      });
      console.log({ findCoupon, newSave });
      const adding = await newSave.save();
      return adding;
    }
    {
      const newSave = new this.saveProductModel({
        product: findDeal,
        user,
        created: moment().format(),
      });
      console.log({ findDeal, newSave });
      const add = await newSave.save();
      return add;
    }
  }

  async findAll(user_id: string) {
    const findUser = await this.UserModel.findById(user_id);
    const getSaved = await this.saveProductModel.findOne();
    if (findUser._id.toString() !== getSaved.user.toString()) {
      throw new UnauthorizedException({
        message: 'this is not your list',
      });
    } else {
      const get = await this.saveProductModel.find();
      if (get) {
        return get;
      }
      throw new NotFoundException({ message: 'empty cart' });
    }
  }

  async findOne(save_id: string, user_id: string) {
    const findSaved = await this.saveProductModel.findById(save_id);
    const findUser = await this.UserModel.findById(user_id);
    if (findUser._id.toString() !== findSaved.user.toString()) {
      throw new UnauthorizedException({
        message: 'this is not your list',
      });
    }
    {
      return findSaved;
    }
  }

  async remove(save_id: string, user_id: string) {
    const findSaved = await this.saveProductModel.findById(save_id);
    const findUser = await this.UserModel.findById(user_id);
    if (findUser._id.toString() !== findSaved.user.toString()) {
      throw new UnauthorizedException({
        message: 'you are not allowed to make changes',
      });
    }
    {
      return 'deleted succefully';
    }
  }
}
