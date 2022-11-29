import User, { IUser } from '../models/User.js';

export const getFormattedFriends = async (user: IUser) => {
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id)),
    );

    const formattedFriends = (friends as IUser[]).map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        },
    );

    return formattedFriends;
};