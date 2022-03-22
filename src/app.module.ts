import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DealModule } from './deal/deal.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://pestoree:pestore2022@cluster0.gtbrm.mongodb.net/pestoree?retryWrites=true&w=majority',
    ),
    UserModule,
    DealModule,
  ],
})
export class AppModule {}
