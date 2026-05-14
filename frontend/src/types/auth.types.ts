import {z} from "zod"

export const dataSchema = z.object({
    firebaseUid:z.string(),
    _id:z.string(),
    isProfileComplete:z.boolean()
})

export const authResSchema = z.object({
    data:dataSchema,
    message:z.string()
})


export type authResType = z.infer<typeof authResSchema>