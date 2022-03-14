import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports: [AuthModule, UserModule],
  //controllers: [UserController, AuthController],
  // providers: [UserService],
})
export class UserModule {}
