import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { LocalStrategy } from './local-strategy';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {

  
}
