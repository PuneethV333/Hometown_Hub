import {z} from 'zod'

export const signUpViaGoogleReqBodySchema = z.object({
    firebaseUid:z.string()
})

export type signUpViaGoogleReqBodyTypes = z.infer<typeof signUpViaGoogleReqBodySchema>

export const authResSchema = z.object({
    firebaseUid:z.string(),
    _id:z.string(),
    isProfileComplete:z.boolean()
})

export type authResType = z.infer<typeof authResSchema>