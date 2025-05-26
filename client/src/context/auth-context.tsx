import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth, handleRedirect } from "@/lib/firebase";
import { apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Try to get existing user
          const response = await fetch("/api/users/me", {
            headers: {
              Authorization: `Bearer ${firebaseUser.uid}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else if (response.status === 404) {
            // User doesn't exist, create new user
            const newUser = await apiRequest("POST", "/api/users", {
              firebaseUid: firebaseUser.uid,
              username: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "user",
              email: firebaseUser.email || "",
            });
            setUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    // Handle redirect result on app load
    handleRedirect().catch(console.error);

    return unsubscribe;
  }, []);

  const signIn = async () => {
    const { signInWithGoogle } = await import("@/lib/firebase");
    await signInWithGoogle();
  };

  const signOut = async () => {
    const { signOutUser } = await import("@/lib/firebase");
    await signOutUser();
    setUser(null);
    setFirebaseUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = await apiRequest("PATCH", `/api/users/${user.id}`, updates);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    isLoading,
    signIn,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
