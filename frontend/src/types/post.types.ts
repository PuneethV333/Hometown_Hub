import {z} from "zod"

export const addPostPayload= z.object({
    content:z.string().default(""),
    image:z.url(),
    communityId:z.string()
})

export type addPostPayloadType = z.infer<typeof addPostPayload>