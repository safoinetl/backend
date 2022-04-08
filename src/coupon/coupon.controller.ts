import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetUser } from 'src/decorators/user-decorator';
import { couponHelper } from 'src/shared/couponHelper';
import { imageFileFilter } from 'src/shared/ImageValidation';
import { CouponService } from './coupon.service';
import { UpdateCouponDto } from 'src/dto/coupondto/update-coupon.dto';
import { CreateCouponDto } from 'src/dto/coupondto/create-coupon.dto';
@Controller('coupon')
@UseGuards(AuthGuard())
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('/createCoupon')
  create(
    @Body() createCouponDto: CreateCouponDto,
    @GetUser('user') user_id: string,
  ) {
    console.log(user_id);
    return this.couponService.createCoupon(createCouponDto, user_id);
  }

  @Get('/allCoupon')
  findAll() {
    return this.couponService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') coupon_id: string) {
    return this.couponService.findOne(coupon_id);
  }

  @Put('/:id')
  update(
    @Param('id') coupon_id: string,
    @Body() updateCouponDto: UpdateCouponDto,
    @GetUser() user_id: string,
  ) {
    return this.couponService.updateCoupon(user_id, updateCouponDto, coupon_id);
  }

  @Delete('/:id')
  remove(@Param('id') coupon_id: string, @GetUser() user_id: string) {
    return this.couponService.deleteCoupon(coupon_id, user_id);
  }
  @Get('/couponsearch/:name')
  filterByTitle(@Param('name') coupon_name: string) {
    return this.couponService.filterByTitle(coupon_name);
  }
  @Post('/uploadImg')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: couponHelper.destinationPath,
        filename: couponHelper.customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file, @Res() res) {
    const image = file.filename;
    return res.status(HttpStatus.CREATED).json({
      response: image,
    });
  }
  @Get('/coupon/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './couponimages' });
  }
}
