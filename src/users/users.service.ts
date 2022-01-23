import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ){}

    async insertUser(name: string, email: string, password: string, role: String){
        const newUser = new this.userModel({
            name,
            email,
            password,
            role
        });
        const result = await newUser.save();
        return { id: result.id, name: result.name, email: result.email, role: result.role } as User;
    }

    async getUsers(){
        const users = await this.userModel.find().populate('role').exec();
        return users.map(user =>({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }));
    }

    async getSingleUser(id: string){
        const user = await this.findUser(id);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }

    async updateUser(id: string, name?: string, email?: string, password?: string, role?: String){
        const updateUser = await this.findUser(id);

        if(name){
            updateUser.name = name;
        }
        if(email){
            updateUser.email = email;
        }
        if(role){
            updateUser.role = role;
        }
        if(password){
            updateUser.password = password;
        }
    }

    async deleteUser(id: string){
        const user = await this.userModel.deleteOne({_id: id}).exec();
        if(user.deletedCount === 0){
            throw new NotFoundException('Could not find this user');
        }
    }


    private async findUser(id: string){
        let user;
        try{
            user = await this.userModel.findById(id).exec();
        }catch(err){
            throw new NotFoundException('Could not find user.');
        }
        if(!user){
            throw new NotFoundException('Could not find user.');
        }
        return user as User;
    }

}
