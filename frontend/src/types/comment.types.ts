import {z} from "zod"
export const addCommentPayloadSchema = z.object({
    content:z.string(),
    postId:z.string()
})

export type addCommentPayloadType = z.infer<typeof addCommentPayloadSchema>