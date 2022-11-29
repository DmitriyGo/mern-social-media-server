import User, { IUser } from '../models/User.js';
import { Request, Response } from 'express';
import { getFormattedFriends } from '../features/users.js';

/*  READ */
export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: (err as Error).message });
    }
};

export const getUserFriends = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const formattedFriends = await getFormattedFriends(user as any);

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: (err as Error).message });
    }
};

/*  UPDATE  */
export const addRemoveFriend = async (req: Request, res: Response) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) return;

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = friend.friends.filter(friendId => friendId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const formattedFriends = await getFormattedFriends(user as any);

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: (err as Error).message });
    }
};