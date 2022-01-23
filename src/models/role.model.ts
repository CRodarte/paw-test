import * as mongoose from 'mongoose';
import { User, UserSchema } from './user.model';

export const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: UserSchema, required: false },
});

export const Role = mongoose.model('Role', RoleSchema);

export interface Role extends mongoose.Document {
    id: string;
    name: string;
    description: string;
    user?: String
}