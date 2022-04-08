import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SaveProductService } from './save-product.service';
import { GetUser } from 'src/decorators/user-decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('save-product')
@UseGuards(AuthGuard())
export class SaveProductController {
  constructor(private readonly saveProductService: SaveProductService) {}

  @Post('add-to-save/:id')
  create(
    @GetUser() user_id: string,
    @Param('id') coupon_id: string,
    @Param('id') deal_id: string,
  ) {
    return this.saveProductService.createSave(user_id, coupon_id, deal_id);
  }

  @Get('/allsaves')
  findAll(@GetUser() user_id: string) {
    return this.saveProductService.findAll(user_id);
  }

  @Get('/:id')
  findOne(@Param('id') save_id: string, @GetUser() user_id: string) {
    return this.saveProductService.findOne(save_id, user_id);
  }

  @Delete('/:id')
  remove(@Param('id') save_id: string, @GetUser() user_id: string) {
    return this.saveProductService.remove(save_id, user_id);
  }
}
