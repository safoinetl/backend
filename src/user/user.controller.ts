import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Put,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/user-decorator';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from 'src/dto/updating_profile_info.dto';
import { category } from 'src/enum/category-enum';
 
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('/:id')
  // @UseGuards(AuthGuard('jwt'))
  // findOne(@Param('id') user_id: string): Promise<User> {
  //   return this.userService.findUserById(user_id);
  // }

  /////////////////////////////////////////////////////////////
  @Put('/editProfile')
  updateProfile(
    @GetUser('user') user_id: string,
    @Body()
    data: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(data, user_id);
  }

  @Get('/user')
  async findOne(@GetUser('user') user: User): Promise<User> {
    return this.userService.findOne(user);
  }
  @Get('/:filename')
  async getFile(@Param('image') image: string, @Res() res: any) {
    res.sendFile(image, { root: `./uploads/ ` });
  }
  @Get('/:ProfilePicture')
  getImage(@Param('ProfilePicture') ProfilePicture: string) {
    return this.userService.getImage(ProfilePicture);
  }
}
