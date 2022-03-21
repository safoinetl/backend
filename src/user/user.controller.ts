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
} from '@nestjs/common';
import { GetUser } from 'src/decorators/user-decorator';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import path from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { Query } from '@nestjs/common';
import { GetProfileFilterDto } from 'src/dto/getProfileFilter.dto';
import { map, Observable } from 'rxjs';
import { UpdateProfileDto } from 'src/dto/updating_profile_info.dto';
export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename = file.originalname;
      cb(null, `${filename}`);
    },
  }),
};
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  // @Get('/:id')
  // @UseGuards(AuthGuard('jwt'))
  // findOne(@Param('id') user_id: string): Promise<User> {
  //   return this.userService.findUserById(user_id);
  // }




  @Put('/edit')
  @UseGuards(AuthGuard('jwt'))
  update(
    @GetUser('user') { user_id }: User,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateProfileDto,
  ) {
    return this.userService.updateUser(user_id, data);
  }

  @Get('/user')
  async findOne(@GetUser('user') user: User): Promise<User> {
    delete user.password;
    delete user.email;
    console.log(`Hello ${user}`);
    return user;
  }
  // @Post('/upload')
  // @UseInterceptors(FileInterceptor('ProfilePicture', storage))
  // uploadProfilePic(@UploadedFile() file, @Request() req): Observable<any> {
  //   const user = req.user;
  //   console.log(user);
  //   // return file.path;
  //   return this.userService
  //     .updateOne(user.user_id, file.path)
  //     .pipe(map(user.profilePicture));
  // }
  
}
