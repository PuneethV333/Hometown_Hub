import {z} from "zod";

export const signInViaEmailSchema = z.object({
    email:z.string().email(),
    password:z.string()
})

export type signInViaEmailType = z.infer<typeof signInViaEmailSchema>

export const signUpViaEmailSchema = z.object({
    email:z.string().email(),
    password:z.string()
})

export type signUpViaEmailType = z.infer<typeof signUpViaEmailSchema>

