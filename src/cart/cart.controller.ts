import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/user-decorator';
import { CartService } from './cart.service';
import { CreateCartDto } from '../dto/cartdto/create-cart.dto';
import { UpdateCartDto } from '../dto/cartdto/update-cart.dto';
import { Deal } from 'src/schemas/deal.schema';

@Controller('cart')
@UseGuards(AuthGuard())
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post('/adddealtocart/:deal') //test it tomorrow
  // saveDeal(
  //   @Param('deal') deal_id: string,
  //   @Body() CreateCartDto: CreateCartDto,
  //   @GetUser() user_id: string,
  //   products: string,
  //   //price: number,
  // ) {
  //   return this.cartService.saveDeal(
  //     deal_id,
  //     user_id,
  //     products,
  //     CreateCartDto,
  //     //price,
  //   );
  // }

  @Get('/cart/:cart')
  getCartById(@Param('cart') cart_id: string, @GetUser() user_id: string) {
    return this.cartService.getCartById(user_id, cart_id);
  }
  @Get('/carts')
  findAllcart(@GetUser() user_id: string) {
    return this.cartService.findAllcart(user_id);
  }
  @Put('/editCart/:cart')
  updatecart(
    @Param('cart') cart_id: string,
    @Body() updateCartDto: UpdateCartDto,
    @GetUser() user_id: string,
  ) {
    return this.cartService.updatecart(cart_id, updateCartDto, user_id);
  }

  @Delete('/deletecart/:cart_id')
  remove(@Param('cart_id') cart_id: string, @GetUser() user_id: string) {
    return this.cartService.remove(cart_id, user_id);
  }

  // @Post('/addcoupontocart/:coupon')
  // saveCoupon(
  //   @Param('coupon') coupon_id: string,
  //   @GetUser() user_id: string,
  //   @Body() createCartDto: CreateCartDto,
  //   products: string,
  // ) {
  //   return this.cartService.saveCoupon(
  //     coupon_id,
  //     user_id,
  //     products,
  //     createCartDto,
  //   );
  // }
  @Post('/add-to-cart/:id')
  addToCart(
    @Param('id') deal_id: string,
    @Param('id') coupon_id: string,
    @GetUser() user_id: string,
    @Body() createCartDto: CreateCartDto,

    products: string,
  ) {
    return this.cartService.addToCart(
      user_id,
      createCartDto,
      deal_id,
      coupon_id,
      products,
    );
  }
}
