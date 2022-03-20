import {
  Controller,
  HttpCode,
  HttpStatus,
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

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename = file.originalname;
      cb(null, `${filename}`);
    },
  }),
};
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
  async signin(@Body() signInDto: signInDto) {
    return await this.authService.signIn(signInDto);
    // return await res.status(HttpStatus.ACCEPTED).json({
    //   response: user,
    // });
  }
  @Post('/profilePic')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Req() req: Request): Promise<User> {
    const user = req.user;
    console.log(user);
    return file.path;
  }
  ////////////////////////////////////////////////////
  // return (
  //   this.authService
  //     // .updateOne(user.email, file)
  //     .pipe(map((user: User) => ({ profilePicture: user.profilePicture })))
  // );
}
