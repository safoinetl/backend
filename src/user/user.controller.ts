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
export class UserController {
  constructor(private userService: UserService) {}
  // @Get('All')
  // @UseGuards(UseGuards)
  // GetAllProfiles(
  //   @Query() GetProfileFilterDto: GetProfileFilterDto,
  // ): Promise<User> {
  //   return this.userService.getAllProfiles(GetProfileFilterDto);
  // }
  @Get('/:id')
  @UseGuards(UseGuards)
  findOne(@Param('id') user_id: string): Promise<User> {
    return this.userService.findUserById(user_id);
  }

  // async addAvatar(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
  //   return this.userService.addAvatar(request.user.user_id, {
  //     path: file.path,
  //     filename: file.originalname,
  //     mimetype: file.mimetype
  //   });
  // }
  @Post('/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('ProfilePicture', storage))
  uploadProfilePic(@UploadedFile() file, @Request() req): Observable<any> {
    const user = req.user;
    console.log(user);
    // return file.path;
    return this.userService
      .updateOne(user.user_id, file.path)
      .pipe(map(user.profilePicture));
  }
}
