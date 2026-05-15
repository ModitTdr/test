import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { signUp } from "../services/authService";
import Button from "@/components/atom/Button"
import RegisterSchema from "../schema/registerSchema";
import FloatingFormInput from "@/components/molecule/FloatingFormInput";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = (data: { email: string, password: string, confirmPassword: string }) => {
    signUp(data)
  }

  return (
    <section className="space-y-16 w-full max-w-[440px] p-10 py-14 shadow-md border border-subtle rounded-sm">
      <div className="text-center space-y-1">
        <h1 className="text-4xl lg:text-[3vw] font-bold leading-none">Register</h1>
        <p className="text-lg lg:text-[1.2vw] text-foreground-muted">Create an account to get started</p>
      </div>
      <form className="text-center space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FloatingFormInput
            title="Email"
            type="email"
            {...register("email", { required: "Email required" })}
            error={errors.email?.message}
            disabled={isSubmitting}
          />
          <FloatingFormInput
            title="Password"
            type="password"
            {...register("password", { required: "Password required" })}
            error={errors.password?.message}
            disabled={isSubmitting}
          />
          <FloatingFormInput
            title="Confirm Password"
            type="password"
            {...register("confirmPassword", { required: "Confirm Password required" })}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting}
          />
        </div>
        <Button variant="primary" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>

        <div className="text-foreground-muted">
          <p>Already have a account? <Link to="/login" className="text-foreground">Login</Link></p>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage