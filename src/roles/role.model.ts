import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

export interface Role extends mongoose.Document {
    id: string;
    name: string;
    description: string;
}