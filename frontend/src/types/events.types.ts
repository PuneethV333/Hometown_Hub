import { z } from "zod"

export const addEventsReqBodySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  location: z.string(),
  community: z.string(),
})

export type addEventsReqBodyType = z.infer<typeof addEventsReqBodySchema>