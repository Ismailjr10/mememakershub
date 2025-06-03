import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env."AIzaSyCYgzdY8gQbrakeCRxDcC3H5_gW24IdFUA",
  authDomain: `${import.meta.env."mememakershub-e9c87.firebaseapp.com"}.firebaseapp.com`,
  projectId: import.meta.env."mememakershub-e9c87",
  storageBucket: `${import.meta.env."mememakershub-e9c87.firebasestorage.app"}.firebasestorage.app`,
  appId: import.meta.env."1:421757168673:web:e95875de93f80abfd00760",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const signOutUser = () => {
  return signOut(auth);
};

export default app;
