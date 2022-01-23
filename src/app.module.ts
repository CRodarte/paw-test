import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://m001-student:iZC6eHvzsZlgQwg8@sandbox.6stqh.mongodb.net/paw-test?retryWrites=true&w=majority'), RolesModule, UsersModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
