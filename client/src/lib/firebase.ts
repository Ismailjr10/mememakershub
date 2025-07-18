import { z } from "zod";

const UserCredentialSchema = z.object({
  uid: z.string(),
});

export const signInWithGoogle = async () => {
  // This would need a server-side implementation to handle the Google sign-in flow
  throw new Error("Google sign-in is not implemented");
};

export const signInWithEmail = async (email: string, password: string) => {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return UserCredentialSchema.parse(data);
};

export const signUpWithEmail = async (email: string, password: string) => {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return UserCredentialSchema.parse(data);
};

export const resetPassword = async (email: string) => {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const signOutUser = async () => {
  await fetch("/api/auth/sign-out", { method: "POST" });
};

// Mock Auth object for compatibility
export const auth = {
  onAuthStateChanged: (callback: (user: { uid: string } | null) => void) => {
    // This would need to be implemented with a session mechanism
    return () => {};
  },
};
