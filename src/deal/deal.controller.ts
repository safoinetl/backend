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
  Query,
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
import { getDealsfiltersDto } from '../dto/dealFilter.dto';
export const storage = {
  storage: diskStorage({
    filename: (Req, file, callback) => {
      callback(null, file.originalname);
    },
    destination: (req, file, callback) => {
      const newpath = uuid();
      console.log(newpath);
      const path = `./DealUpload//${newpath}`;
      //fs.mkdirSync(path);
      fs.promises.mkdir(path, { recursive: true });
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
  @Put('/dealEdit/:id')
  updateDeal(
    @Param('id') deal_id: string,
    @Body() updateDealDto: UpdateDealDto,
    @GetUser() user_id: string,
  ) {
    return this.dealService.updateDeal(deal_id, updateDealDto, user_id);
  }
  @Delete('/deleteDeal/:id')
  remove(@Param('id') deal_id: string, @GetUser('user') user_id: string) {
    return this.dealService.deleteDeal(deal_id, user_id);
  }
  @Get('/DealSearch')
  filterByCategory(@Query('category') getDealsfiltersDto: getDealsfiltersDto) {
    return this.dealService.filterByCategory(getDealsfiltersDto);
    // console.log([getDealsfiltersDto]);
    // return [getDealsfiltersDto];
  }
}
