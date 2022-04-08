import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartDocument } from 'src/schemas/cart.schema';
import { CreateCartDto } from '../dto/cartdto/create-cart.dto';
import { UpdateCartDto } from '../dto/cartdto/update-cart.dto';
import { Model } from 'mongoose';
import { CouponDocument } from 'src/schemas/coupon.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { DealDocument } from 'src/schemas/deal.schema';
import * as moment from 'moment';
@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly CartModel: Model<CartDocument>,
    @InjectModel('Coupon') private CouponModel: Model<CouponDocument>,
    @InjectModel('User') private UserModel: Model<UserDocument>,
    @InjectModel('Deal') private DealModel: Model<DealDocument>,
  ) {}
  async getCartById(user_id: string, cart_id: string) {
    const findCart = await this.CartModel.findById(cart_id);
    const findUser = await this.UserModel.findById(user_id);
    if (findUser._id.toString() !== findCart.user.toString()) {
      throw new UnauthorizedException({
        message: 'this is not your cart',
      });
    }
    if (!findUser) {
      throw new NotFoundException({ message: 'Not Found' });
    }
    const getSaved = await this.CartModel.findById(findCart);
    return getSaved;
  }

  async findAllcart(user_id: string) {
    const findUser = await this.UserModel.findById(user_id);
    const getSaved = await this.CartModel.findOne();
    if (findUser._id.toString() !== getSaved.user.toString()) {
      throw new UnauthorizedException({
        message: 'this is not your cart',
      });
    } else {
      const get = await this.CartModel.find();
      if (get) {
        return get;
      }
      throw new NotFoundException({ message: 'empty cart' });
    }
  }
  async updatecart(
    cart_id: string,
    updateCartDto: UpdateCartDto,
    user_id: string,
  ) {
    const { quantity, totalPrice } = updateCartDto;
    const user = await this.UserModel.findById(user_id);
    const findCart = await this.CartModel.findById(cart_id).exec();
    //const totalPrice = quantity * findCart; //it can be removed later
    if (user._id.toString() !== findCart.user.toString()) {
      console.log({ user, findCart });
      throw new UnauthorizedException({
        message: 'you are not allowed to make changes',
      });
    }
    const newCart = await this.CartModel.findByIdAndUpdate(cart_id, {
      updateCartDto,
      totalPrice,
    });
    return newCart;
  }

  async remove(cart_id: string, user_id: string) {
    const user = await this.UserModel.findById(user_id);
    const findCart = await this.CartModel.findById(cart_id);
    if (user._id.toString() !== findCart.user.toString()) {
      console.log({ user, findCart });
      throw new UnauthorizedException({
        message: 'this is not your cart',
      });
    }
    await this.CartModel.findByIdAndRemove(cart_id);
    return 'deleted succesfully';
  }
  async addToCart(
    user_id: string,
    createCartDto: CreateCartDto,
    deal_id: string,
    coupon_id: string,
    products: string,
  ) {
    const { quantity } = createCartDto;
    const findDeal = await this.DealModel.findById(deal_id).exec();
    const findCoupon = await this.CouponModel.findById(coupon_id).exec();
    const user = await this.UserModel.findById(user_id).exec();
    if (!findDeal) {
      if (!findCoupon) {
        throw new NotFoundException({ message: 'product Not Found' });
      }
      const mount = quantity * findCoupon.price;
      const quant = mount / findCoupon.price;

      const newCart = new this.CartModel({
        products: findCoupon,
        quantity: quant,
        totalPrice: mount,
        user,
        created: moment().format(),
      });
      console.log({ findCoupon, newCart });
      const adding = await newCart.save();
      return adding;
    } else if (findDeal) {
      const mount = quantity * findDeal.price;
      console.log(mount);
      const newCart = new this.CartModel({
        products: findDeal,
        quantity,
        totalPrice: mount,
        user,
        created: moment().format(),
      });
      console.log({ findDeal, newCart });
      const add = await newCart.save();
      return add;
    }
  }
}
