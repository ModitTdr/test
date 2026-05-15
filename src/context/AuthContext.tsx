import { auth } from "@/features/authentication/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return user;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
