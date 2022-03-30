import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal, DealDocument } from 'src/schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { use } from 'passport';

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
    return `This action returns a #${deal_id} deal`;
  }

  updateDeal(deal_id: string, updateDealDto: UpdateDealDto) {
    const deal = this.DealModel.updateMany({ deal_id }, updateDealDto);
    return deal;
  }
  // async create(createDealDto: CreateDealDto, user_id: string) {
  //   const user = await this.UserModel.findById(user_id).exec();
  //   const newDeal = new this.DealModel(createDealDto, user);
  //   try {
  //     await newDeal.save();
  //     await this.UserModel.findByIdAndUpdate(user_id, {
  //       $push: { Deal: newDeal },
  //     }).exec();
  //     return { newDeal, user };
  //   } catch (error) {
  //     throw new InternalServerErrorException('check');
  //   }
  // }
}

// remove(id: number) {
//   return `This action removes a #${id} deal`;
// }

// async update(
//   deal_id: string,
//   dealupdtDTO: UpdateDealDto,
//   user_id: string,
// ): Promise<Deal> {
//   const deal = await this.DealModel.findById(deal_id);
//   if (user_id !== deal.user.toString()) {
//     throw new UnauthorizedException({
//       message: 'You do not own this product',
//     });
//   }
//   await deal.updateOne({ deal_id }, dealupdtDTO);
//   return await this.DealModel.findById(deal_id).populate('User');
// }

// async delete(id: string, user_id: string): Promise<Deal> {
//   const product = await this.productModel.findById(id);
//   if (userId !== product.owner.toString()) {
//     throw new HttpException(
//       'You do not own this product',
//       HttpStatus.UNAUTHORIZED,
//     );
//   }
//   await product.remove();
//   return product.populate('owner');
// }
//
