import { z } from "zod";

const eventSchema = z.object({
    name: z.string().min(2, {
        message: "Event name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string({
        required_error: "Please select a category.",
    }),
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
        message: "Please enter a valid price.",
    }),
})

export { eventSchema }