import Comment from "../models/comments.models";
import Post from "../models/post.models";
import User from "../models/user.models";
import { addCommentPayloadType } from "../types/comments.types";
import { clearCache } from "../utils/redis.utils";

export const addCommentServices = async (firebaseUid:string,payload:addCommentPayloadType) => {
    const user = await User.findOne({firebaseUid})
    if(!user) throw new Error("unauthorized")

    const postExists = await Post.findOne({_id:payload.postId})
    
    if(!postExists){
        throw new Error("post does not exits")
    }
    
    const newComment = await Comment.create({
        by:user._id,
        content:payload.content
    })
    
    if(!newComment){
        throw new Error("failed to create comment")
    }

    const updatedPost = await Post.findOneAndUpdate({
        _id:payload.postId
    },{
        $addToSet:{comments:newComment._id},
        $inc:{commentNumber:1}
    })
    
    if(!updatedPost){
        throw new Error("failed to add to post")
    }
    
    await clearCache(`post:${firebaseUid}`)
    
    return updatedPost
}