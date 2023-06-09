import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Response, response } from 'express';
import { createUserProfileDto } from 'src/dtos/createProfile.dto';


import { createUserDto } from 'src/dtos/createUser.dto';
import { createUserPostDto } from 'src/dtos/createUserPost.dto';
import { updateUserDto } from 'src/dtos/updateUser.dtio';
import { UsersService } from 'src/user/services/users/users.service';
import { createUserProfilParams, SerializedUser } from 'src/utils/types';

@Controller('/users')
export class UsersController {

    constructor(private userService: UsersService)
    {
        
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('deatils')
    getUsers()
    {
       return this.userService.findUsers();
    //    if(user) return new SerializedUser()

    //    else
    //     throw new HttpException('User not found ',HttpStatus.BAD_REQUEST)
       
    }


    @Post('add')
    async createUser(@Body(ValidationPipe) createUserDto: createUserDto, 
    @Res() response: Response)
    {
    const addUser = await this.userService.createUsers(createUserDto)
    
       
        response.json({

            message: "User profile added"
          
        })
        
    }


    // @Post('signIn')
    // async loginUser(@Body(ValidationPipe) createUserDto: createUserDto, 
    // @Res() response: Response)
    // {
    // const addUser = await this.userService.loginUser(createUserDto)
    
       
    //     response.json({

    //         message: "User logged-In !"
          
    //     })
        
    // }

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
    

    @Delete('delete/:id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number , @Res() response: Response)
    {
        await this.userService.deleteUser(id)
        response.json({

            message: "User deleted successfully "
        })
    }

    //User Profile

    // @Post('profile/add/:id')
    // async createUserProfile(
    //     @Param('id', ParseIntPipe) id: number, @Res() response: Response,
    //     @Body() createUserProfileDto: createUserProfileDto,)
    //     {
    //         const user = await this.userService.createUserProfile(id, createUserProfileDto);

    //         response.json({

    //             message: "User profile added",
    //             data: user
    //         })
    //     }

    @Post('post/add/:id')
    async createUserPost(@Param('id', ParseIntPipe) id: number, 
    @Res() response: Response,
    @Body() createUserPostDto: createUserPostDto)
    {
        const userPost = await this.userService.createUserPost(id,createUserPostDto)
        console.log("user post data are: ",userPost)
        response.json({

            message: "User post data added !" ,
            data: userPost
        })
    }

    @Post('profile/addNew/:id')
    async addnewProfile(@Param('id', ParseIntPipe) id:number,
    @Body() createUserProfileDto: createUserProfileDto,
    @Res() response: Response, )
    {
        const userData = await this.userService.createUserProfileNew(id,createUserProfileDto)

        response.json({

            message: "User newprofile added",
            data: userData
        })
    }

}