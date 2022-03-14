import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://pestoree:pestore2022@cluster0.gtbrm.mongodb.net/pestoree?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
})
export class AppModule {}
