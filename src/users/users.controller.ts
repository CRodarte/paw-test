import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async addUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('role') role: string
    ) {
        const user = await this.usersService.insertUser(name, email, password, role);
        return user as User;
    }

    @Get()
    async getAllUsers() {
        const users = await this.usersService.getUsers();
        return users as User[];
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getSingleUser(id);
    }

    @Patch(':id')
    async updateRole(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('role') role: string
    ) {
        return await this.usersService.updateUser(id, name, email, password, role);
    }

    @Delete(':id')
    async removeRole(@Param('id') id: string) {
        return await this.usersService.deleteUser(id);
    }

}
