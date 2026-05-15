import z from "zod";

const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password should be at least one uppercase, lowercase, capital, number and special character')
})

export default LoginSchema;
export type LoginSchema = z.infer<typeof LoginSchema>;
