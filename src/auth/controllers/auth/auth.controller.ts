import { Body, Controller, Inject, Injectable, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.gurad';
import { loginuser } from 'src/dtos/loginuser.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UsersService } from 'src/user/services/users/users.service';



@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService)
    {
        
    }
    
    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async userLogin(@Body(ValidationPipe) LoginUserDto: loginuser ,
    @Res() response: Response )
    {
       
    

        
    }
      
}




