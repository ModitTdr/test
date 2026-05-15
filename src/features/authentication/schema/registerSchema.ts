import z from "zod";
import LoginSchema from "./loginSchema";

const RegisterSchema = LoginSchema.extend({
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default RegisterSchema;
export type RegisterSchema = z.infer<typeof RegisterSchema>;