import mongoose, { Types } from 'mongoose';

export type IUser = {
    _id: Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    picturePath: string,
    friends: Array<string>,
    location: string,
    occupation: string
}

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: false,
            min: 6,
        },
        picturePath: {
            type: String,
            default: '',
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', UserSchema);

export default User;