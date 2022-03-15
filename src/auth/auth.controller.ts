import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { signInDto } from '../dto/signin.Dto';
import { diskStorage } from 'multer';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs';
import { pipe } from 'rxjs';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
  }),
};
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  @HttpCode(200)
  signin(@Body() signInDto: signInDto): Promise<{ accessToken }> {
    return this.authService.signIn(signInDto);
  }
 

  ////////////////////////////////////////////////////
  // return (
  //   this.authService
  //     // .updateOne(user.email, file)
  //     .pipe(map((user: User) => ({ profilePicture: user.profilePicture })))
  // );

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './src/uploads/profileimages',
  //       filename: (req, file, cb) => {
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() file): Promise<Object> {
  //   return file.path ;
  // }
}
