import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from '../models/role.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel('Role') private readonly roleModel: Model<Role>,
    ) { }

    async insertRole(name: string, description: string) {
        const newRole = new this.roleModel({
            name,
            description
        });
        const result = await newRole.save();
        return result.id as string;
    }

    async getRoles() {
        const roles = await this.roleModel.find().exec();
        return roles.map(role => ({
            id: role.id,
            name: role.name,
            description: role.description,
        }));
    }

    async getSingleRole(id: string) {
        const role = await this.findRole(id);
        return {
            id: role.id,
            name: role.name,
            description: role.description,
        };
    }

    async updateRole(
        id: string,
        name: string,
        description: string,
    ) {
        const updatedRole = await this.findRole(id);
        if (name) {
            updatedRole.name = name;
        }
        if (description) {
            updatedRole.description = description;
        }
        updatedRole.save();
        return updatedRole;
    }

    async deleteRole(id: string) {
        const result = await this.roleModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find role.');
        }
    }

    private async findRole(id: string): Promise<Role> {
        let role;
        try {
            role = await this.roleModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find role.');
        }
        if (!role) {
            throw new NotFoundException('Could not find role.');
        }
        return role;
    }
}