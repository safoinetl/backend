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
  HttpStatus,
  UploadedFiles,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DealService } from './deal.service';
import { CreateDealDto } from '../dto/dealdto/create-deal.dto';
import { UpdateDealDto } from '../dto/dealdto/update-deal.dto';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/user-decorator';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Deal } from 'src/schemas/deal.schema';
import { getDealsfiltersDto } from '../dto/authDto/dealFilter.dto';
import { category } from '../enum/category-enum';
import { DealHelper } from 'src/shared/dealHelper';
import { imageFileFilter } from 'src/shared/ImageValidation';
import { join } from 'path';

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
  @Get('/DealSearch/:category')
  filterByCategory(@Param() deal: Deal) {
    return this.dealService.filterByCategory(deal);
  }
  @Get('/DealsearchByTitle/:title')
  filterByTitle(@Param('title') title: string) {
    return this.dealService.filterByTitle(title);
  }

  @Post('/uploadDealImgs')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: DealHelper.destinationPath,
        filename: DealHelper.customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Res() res) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = file.filename;
      response.push({ fileReponse });
    });
    return res.status(HttpStatus.CREATED).json({
      response: response,
    });
  }
  @Get('/dealImgs/:imgpath')
  seeUploadedFile(@Param('imgpath') images, @Res() res) {
    return res.sendFile(images, { root: './dealimages' });
  }
  
  }
  // @Get('/img/:deal_id')
  // findallPic(@Param('deal_id') deal_id, @Res() res, deal: Deal) {
  //   const response = this.dealService.findallPic(deal_id, deal);
  //   return res.status(HttpStatus.OK).json({
  //     response: response,
  //   });
  // }
