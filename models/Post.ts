import mongoose, { ObjectId, Types } from 'mongoose';

export type IPost = {
    _id: Types.ObjectId,
    firstName: string,
    lastName: string,
    picturePath: string,
    userPicturePath: string,
    location: string,
    description: string,
    likes: Map<string | ObjectId, boolean>,
    comments: String[]
}

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

const Post = mongoose.model('Post', PostSchema);

export default Post;