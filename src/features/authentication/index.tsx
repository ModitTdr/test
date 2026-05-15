import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="container mx-auto sm:p-3 h-screen flex items-center justify-center">
      <Outlet />
    </main>
  )
}

export default AuthLayout;