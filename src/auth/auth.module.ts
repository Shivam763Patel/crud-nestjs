import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-strategy';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/services/users/users.service';
import { Post } from 'src/user/entities/post.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { UsersController } from 'src/user/controller/users/users.controller';

@Module({
  imports: [UserModule, PassportModule, TypeOrmModule.forFeature([User,Post, Profile])],
  controllers: [AuthController, UsersController],
  providers: [AuthService, LocalStrategy,UsersService]
})

export class AuthModule {

  

}
