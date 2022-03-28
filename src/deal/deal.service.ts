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
  async createDeal(createDealDto: CreateDealDto): Promise<Deal> {
    const {
      deal_name,
      price,
      description,
      deal_picture,
      category,
      deal_type,
      user_id,
    } = createDealDto;
    const user = await this.UserModel.findOne({ user_id: user_id }).exec();
    const newDeal = new this.DealModel({
      deal_name,
      price,
      description,
      deal_picture,
      category,
      deal_type,
      user,
    });
    console.log(user);
    try {
      await newDeal.save();
      await this.UserModel.findByIdAndUpdate(user.user_id, {
        $push: { deal: newDeal },
      }).exec();
      return newDeal;
    } catch (error) {
      throw new InternalServerErrorException('check your details');
    }
  }
  // async addNotif(addNotificationDto: AddNotificationDto): Promise<void> {
  //   const { message , person_id} = addNotificationDto;
  //   const person = await this.personModel.findById(person_id).exec();
  //   console.log(person) ;
  //   const newNotif = new this.notifficationModel({
  //       message,
  //       person
  //   });
  //  const result = await newNotif.save();
  //  await this.personModel
  //     .findByIdAndUpdate(person_id, {
  //       $push: { notif: newNotif },
  //     })
  //     .exec();
  // }

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
