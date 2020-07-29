import {Schema, model} from 'mongoose';
import {IUser} from "../model/IUser";


const userSchema: Schema<IUser> = new Schema<IUser>({

    name: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },

            message: 'name may only contain letters'
        }
    },

    email: {
        type: String,
        required: true,

        validate: {

            validator: function (value: string): boolean {

                return value.length > 0 && /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value);
            },

            message: 'email should contain @ and .'
        }
    },

    message: {
        type: String,
        required: true,

    },


});

export const User = model<IUser>('user',userSchema);