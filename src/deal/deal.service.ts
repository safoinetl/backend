import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DealDocument } from 'src/schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Model } from 'mongoose';

@Injectable()
export class DealService {
  constructor(@InjectModel('Deal') private DealModel: Model<DealDocument>) {}
  async createDeal(createDealDto: CreateDealDto) {
    const { deal_name, price, description, deal_picture, category, deal_type } =
      createDealDto;
    const newDeal = new this.DealModel({
      deal_name,
      price,
      description,
      deal_picture,
      category,
      deal_type,
    });
    try {
      const deals_details = await newDeal.save();
      return deals_details;
    } catch (error) {
      throw new error('check your details');
    }
  }

  findAll() {
    return this.DealModel.find();
  }

  findOne(deal_id: string) {
    return `This action returns a #${deal_id} deal`;
  }

  updateDeal(deal_id: string, updateDealDto: UpdateDealDto) {
    this.DealModel.updateMany({ deal_id }, updateDealDto);
    return this.findOne(deal_id);
  }

  remove(id: number) {
    return `This action removes a #${id} deal`;
  }
}
