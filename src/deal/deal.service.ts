import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal, DealDocument } from 'src/schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { use } from 'passport';
import mongoose from 'mongoose';
import { getDealsfiltersDto } from 'src/dto/dealFilter.dto';
//import { category } from 'src/enum/category-enum';

@Injectable()
export class DealService {
  constructor(
    @InjectModel('Deal') private DealModel: Model<DealDocument>,
    @InjectModel('User') private UserModel: Model<UserDocument>,
  ) {}
  async createDeal(createDealDto: CreateDealDto, user_id: string) {
    const { title, price, deal_description, category, deal_type, image } =
      createDealDto;
    const user = await this.UserModel.findById(user_id).exec();
    console.log(user);
    const newDeal = new this.DealModel({
      title,
      price,
      deal_description,
      image,
      category,
      deal_type,
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
  // async searchDeals(getDealDto: getDealsfiltersDto) {
  //   const { search, category } = getDealDto;
  //   const query = await this.DealModel.
  // }
  async filterByCategory(getDealDto: getDealsfiltersDto) {
    const { category, search } = getDealDto;
    // const deals = await this.DealModel.find({ category });
    // console.log(category);
    // return deals;
     const query = this.DealModel.find();
    // if (category) {
    //   query.$where(category);
    //   //query.andWhere('task.status = :status', { category: category});
    // }
    // if (search) {
    //   query.$where(
    //     // 'LOWER(deal.title) LIKE LOWER(:search) OR LOWER(deal.deal_description) LIKE LOWER(:search)',
    //     `%${search}%`,
    //   );
    // }
    // const deals = await this.DealModel.find({ category });
    // return deals;
    query.$where('category');
  }
}
