import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/user-decorator';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Deal } from 'src/schemas/deal.schema';

export const storage = {
  storage: diskStorage({
    filename: (Req, file, callback) => {
      callback(null, file.originalname);
    },
    destination: (req, file, callback) => {
      const newpath = uuid();
      console.log(newpath);
      const path = `./DealUpload//${newpath}`;
      fs.mkdirSync(path);
      callback(null, path);
    },
  }),
};
@Controller('deal')
@UseGuards(AuthGuard('jwt'))
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post('/createDeal')
  createDeal(
    @Body() createDealDto: CreateDealDto,
    @GetUser('user') user_id: string,
  ) {
    console.log(user_id);
    return this.dealService.createDeal(createDealDto, user_id);
  }
  @Post('/uploadDealImg')
  @UseInterceptors(FileInterceptor('dealPic', storage))
  uploadFile(@UploadedFile() file) {
    return file.path;
  }
  @Get('/image/:imgpath')
  seeUpoaderFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads' });
  }
  @Get('allDeals')
  findAll() {
    return this.dealService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') deal_id: string) {
    return this.dealService.findOne(deal_id);
  }

  @Put('/:id')
  update(@Param('id') deal_id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealService.updateDeal(deal_id, updateDealDto);
  }
  // @Post('/create')
  // create(
  //   @Body() createDealDto: CreateDealDto,
  //   @GetUser('user') user_id: string,
  // ) {
  //   return this.dealService.create(createDealDto, user_id);
  // }
  // @Put('/:deal_id')
  // updatingDeal(
  //   @Param('deal_id') deal_id: string,
  //   @Body() dealupdtDTO: UpdateDealDto,
  //   @GetUser('user') user_id: string,
  //   //user_id: string,
  // ): Promise<Deal> {
  //   // const { user_id: user_id } = user;
  //   return this.dealService.update(user_id, dealupdtDTO, deal_id);
  // }
  // async update(
  //   @Param('id') id: string,
  //   @Body() product: UpdateProductDTO,
  //   @User() user: UserDocument,
  // ): Promise<Product> {
  //   const { id: userId } = user;
  //   return await this.productService.update(id, product, userId);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dealService.remove(+id);
  // }
}
