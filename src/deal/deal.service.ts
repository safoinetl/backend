import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal, DealDocument } from 'src/schemas/deal.schema';
import { CreateDealDto } from '../dto/dealdto/create-deal.dto';
import { UpdateDealDto } from '../dto/dealdto/update-deal.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import * as moment from 'moment';

@Injectable()
export class DealService {
  constructor(
    @InjectModel('Deal') private DealModel: Model<DealDocument>,
    @InjectModel('User') private UserModel: Model<UserDocument>,
  ) {}

  async createDeal(createDealDto: CreateDealDto, user_id: string) {
    const { title, price, deal_description, category, deal_type, images } =
      createDealDto;
    const user = await this.UserModel.findById(user_id).exec();
    console.log(user);
    const newDeal = new this.DealModel({
      title,
      price,
      deal_description,
      images,
      category,
      deal_type,
      created_date: moment().format(),
      user,
    });
    const result = await newDeal.save();
    await this.UserModel.findByIdAndUpdate(user_id, {
      $push: { deal: newDeal },
    }).exec();
    return { result, user };
  }

  findAll() {
    return this.DealModel.find();
  }

  findOne(deal_id: string) {
    return this.DealModel.findById(deal_id);
  }

  async updateDeal(
    deal_id: string,
    updateDealDto: UpdateDealDto,
    user_id: string,
  ) {
    const user = await this.UserModel.findById(user_id);
    console.log(user._id);
    const findDeal = await this.DealModel.findById(deal_id);
    if (user._id.toString() !== findDeal.user.toString()) {
      console.log({ user, findDeal });
      throw new UnauthorizedException({
        message: 'you are not allowed to make changes',
      });
    }
    const deal = this.DealModel.findByIdAndUpdate(deal_id, updateDealDto);
    return deal;
  }
  async deleteDeal(deal_id: string, user_id: string) {
    const user = await this.UserModel.findById(user_id);
    console.log(user._id);
    const findDeal = await this.DealModel.findById(deal_id);
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
      await this.DealModel.findByIdAndRemove(deal_id);
      const message = { message: 'deleted succefully' };
      return message;
    }
  }
  async filterByCategory(deal: Deal) {
    const categFind = this.DealModel.find({
      category: { $regex: deal.category },
    });
    return categFind;
  }
  async filterByTitle(title: string) {
    const Find = this.DealModel.find({
      // title: title,
      title: { $regex: title },
    });
    return Find;
  }

}
