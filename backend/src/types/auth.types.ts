import {z} from 'zod'

export const signUpViaGoogleReqBodySchema = z.object({
    firebaseUid:z.string()
})

export type signUpViaGoogleReqBodyTypes = z.infer<typeof signUpViaGoogleReqBodySchema>
