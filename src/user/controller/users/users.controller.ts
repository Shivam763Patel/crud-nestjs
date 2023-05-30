import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { createUserDto } from 'src/dtos/createUser.dto';
import { updateUserDto } from 'src/dtos/updateUser.dtio';
import { UsersService } from 'src/user/services/users/users.service';

@Controller('/users')
export class UsersController {

    constructor(private userService: UsersService)
    {
        
    }

    @Get('deatils')
    getUsers()
    {
       return this.userService.findUsers();
       
    }


    @Post('add')
    createUser(@Body() createUserDto: createUserDto)
    {
        this.userService.createUsers(createUserDto)
    }

//     @Post('newCreate')
//     newCreateUser(@Body() userData: createUserDto)
//     {
//      console.log('Req body data', userData);

  
//      return userData
// }

    @Put(':id')
    
       async updateUserById(@Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: updateUserDto)
        {
            await this.userService.updateUser(id,updateUserDto)
        }   
    
}