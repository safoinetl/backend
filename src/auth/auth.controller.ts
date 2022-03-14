import { Controller, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, Request,Get } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { signInDto } from './dto/signin.Dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadedFile } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from './decorators/user-decorator';
export const storage = {
  storage: diskStorage({
    destination: './uploads',
  }),
};
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/signin')
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
