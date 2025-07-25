import {z} from "zod"

export const RegisterSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirm_password: z.string().min(8, "Confirm password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});