import z from "zod";

export const signInSchema = z.object({
    identifier :z.string(),      // used identifer:
    password:z.string()
})