import { Body, Controller, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.gurad';
import { createUserDto } from 'src/dtos/createUser.dto';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async userLogin(@Body(ValidationPipe) createUserDto: createUserDto,
    @Res() response: Response )
    {
       

    }
}
