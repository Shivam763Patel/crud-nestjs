import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UsersController } from './controller/users/users.controller';
import { Post } from './entities/post.entity';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UserModule {}
