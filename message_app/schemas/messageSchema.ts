import z from "zod";
export const messageSchema = z.object({
   content:z
   .string()
   .min(1,{message:"message can not be empty"})
   .max(300,{message:"content must be no longer then 300 character"})
}) 