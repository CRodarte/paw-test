import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';

import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    async addRole(
        @Body('name') name: string,
        @Body('description') description: string,
    ) {
        const generatedId = await this.rolesService.insertRole(
            name,
            description,
        );
        return { id: generatedId };
    }

    @Get()
    async getAllroles() {
        const roles = await this.rolesService.getRoles();
        return roles;
    }

    @Get(':id')
    getRole(@Param('id') id: string) {
        return this.rolesService.getSingleRole(id);
    }

    @Patch(':id')
    async updateRole(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('description') description: string,
    ) {
        return await this.rolesService.updateRole(id, name, description);
    }

    @Delete(':id')
    async removeRole(@Param('id') id: string) {
        return await this.rolesService.deleteRole(id);
    }
}