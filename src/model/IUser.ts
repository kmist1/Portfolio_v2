import {Document} from 'mongoose';

export interface IUser extends Document {
    name: string,
    email: string,
    message: string,
}