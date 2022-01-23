import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true}
});

export interface User extends mongoose.Document{
    id: string,
    name: string,
    email: string,
    password: string,
    role: String
}