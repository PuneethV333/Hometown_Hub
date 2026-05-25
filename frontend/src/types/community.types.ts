import {z} from "zod"

export const createCommunityReqBodySchema = z.object({
    name:z.string(),
    type:z.enum(["town", "city", "state"]),
    icon:z.string().optional(),
    town:z.string().optional(),
    city:z.string(),
    state:z.string()
})

export type createCommunityReqBodyType = z.infer<typeof createCommunityReqBodySchema>