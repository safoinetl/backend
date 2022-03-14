import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/auth/decorators/user-decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('user')
@UseGuards(UserGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') AuthCredentialsDto: AuthCredentialsDto) {
    return this.userService.findOne(AuthCredentialsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
  @Get('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  GetFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
