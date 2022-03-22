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
  createDeal(@Body() createDealDto: CreateDealDto) {
    return this.dealService.createDeal(createDealDto);
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

  @Get(':id')
  findOne(@Param('id') deal_id: string) {
    return this.dealService.findOne(deal_id);
  }

  @Put(':id')
  update(@Param('id') user_id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealService.updateDeal(user_id, updateDealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealService.remove(+id);
  }
}
