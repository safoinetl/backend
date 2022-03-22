import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { signInDto } from '../dto/signin.Dto';
import { diskStorage } from 'multer';
import { Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    //@Res() res,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signUp(authCredentialsDto);
    // return await res.status(HttpStatus.CREATED).json({
    //   response: user,
    // });
  }

  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() signInDto: signInDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(signInDto);
    // return await res.status(HttpStatus.ACCEPTED).json({
    //   response: user,
    // });
  }

  @Post('/uploadImg')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: (Req, file, callback) => {
          callback(null, file.originalname);
        },
        destination: (req, file, callback) => {
          const newpath = uuid();
          console.log(newpath);
          const path = `./uploads//${newpath}`;
          fs.mkdirSync(path);
          callback(null, path);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Res() res) {
    // return
    const image = file.path;
    return res.status(HttpStatus.CREATED).json({
      response: image,
    });
  }
  @Get('/image/:imgpath')
  seeUpoaderFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads' });
  }
}

// @Post('/profilePic')
// @UseGuards(AuthGuard('jwt'))
// @UseInterceptors(FileInterceptor('file', storage))
// uploadFile(@UploadedFile() file, @Req() req: Request): Promise<User> {
//   const user = req.user;
//   console.log(user);
//   return file.path;
// }
////////////////////////////////////////////////////
// return (
//   this.authService
//     // .updateOne(user.email, file)
//     .pipe(map((user: User) => ({ profilePicture: user.profilePicture })))
// );
