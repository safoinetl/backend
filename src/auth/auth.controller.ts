import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/authDto/auth-credentials.Dto';
import { signInDto } from '../dto/authDto/signin.Dto';
import { diskStorage } from 'multer';
import { Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Helper } from 'src/shared/helper';
import { imageFileFilter } from 'src/shared/ImageValidation';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    //@Res() res,
  ): Promise<{ created: string }> {
    return await this.authService.signUp(authCredentialsDto);
    // return await res.status(HttpStatus.CREATED).json({
    //   response: user,
    // });
  }

  @Post('/signin')
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
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file, @Res() res) {
    const image = file.filename;
    return res.status(HttpStatus.CREATED).json({
      response: image,
    });
  }
  @Get('/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './images' });
  }
  @Get('/topic/intndspc')
  getCategory() {
    return this.authService.getCategory();
  }
}