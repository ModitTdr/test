import Button from "@/components/atom/Button"
import { useForm } from "react-hook-form"
import LoginSchema from "../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { signIn } from "../services/authService";
import FloatingFormInput from "@/components/molecule/FloatingFormInput";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: { email: string, password: string }) => {
    await signIn(data)
  }

  return (
    <section className="space-y-16 w-full max-w-[440px] p-10 py-14 shadow-md border border-subtle rounded-sm">
      <div className="text-center space-y-1">
        <h1 className="text-4xl lg:text-[3vw] font-bold leading-none">Sign In</h1>
        <p className="text-lg lg:text-[1.2vw] text-foreground-muted">Login to your account to get started</p>
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
          <div className="space-y-2 text-end">
            <FloatingFormInput
              title="Password"
              type="password"
              {...register("password", { required: "Password required" })}
              error={errors.password?.message}
              disabled={isSubmitting}
            />
            <Link to="/forgot-password" className="text-sm text-foreground/80">Forgot Password?</Link>
          </div>
        </div>
        <Button variant="primary" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>

        <div className="text-foreground-muted">
          <p>Don't have an account? <Link to="/register" className="text-foreground">Register</Link></p>
        </div>
      </form>
    </section>
  )
}

export default LoginPage