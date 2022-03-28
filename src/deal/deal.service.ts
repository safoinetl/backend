import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal, DealDocument } from 'src/schemas/deal.schema';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class DealService {
  constructor(
    @InjectModel('Deal') private DealModel: Model<DealDocument>,
    @InjectModel('User') private UserModel: Model<UserDocument>,
  ) {}
  // async createDeal(createDealDto: CreateDealDto): Promise<Deal> {
  //   const {
  //     deal_name,
  //     price,
  //     description,
  //     deal_picture,
  //     category,
  //     deal_type,
  //     user_id,
  //   } = createDealDto;
  //   const user = this.DealModel.findOne({ user_id: user_id }).exec();
  //   const newDeal = new this.DealModel({
  //     deal_name,
  //     price,
  //     description,
  //     deal_picture,
  //     category,
  //     deal_type,
  //     user,
  //   });
  //   console.log(user);
  //   try {
  //     newDeal.save();
  //     await this.UserModel.findByIdAndUpdate( user_id, {
  //       $push: { deal: newDeal },
  //     }).exec();
  //     return newDeal;
  //   } catch (error) {
  //     throw new InternalServerErrorException('check your details');
  //   }
  // }
  async createDeal(createDealDto: CreateDealDto, user_id: string) {
    const { deal_name, price, description, deal_picture, category, deal_type } =
      createDealDto;
    const user = await this.UserModel.findById(user_id).exec();
    console.log(user);
    const newDeal = new this.DealModel({
      deal_name,
      price,
      description,
      deal_picture,
      category,
      deal_type,
      user,
    });
    const result = await newDeal.save();
    await this.UserModel.findByIdAndUpdate(user_id, {
      $push: { Deal: newDeal },
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
    this.DealModel.updateMany({ deal_id }, updateDealDto);
    return this.findOne(deal_id);
  }

  remove(id: number) {
    return `This action removes a #${id} deal`;
  }
  
  // async update(
  //   id: string,
  //   productDTO: UpdateProductDTO,
  //   userId: string,
  // ): Promise<Product> {
  //   const product = await this.productModel.findById(id);
  //   if (userId !== product.owner.toString()) {
  //     throw new HttpException(
  //       'You do not own this product',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   await product.update(productDTO);
  //   return await this.productModel.findById(id).populate('owner');
  // }

  // async delete(id: string, userId: string): Promise<Product> {
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
}
