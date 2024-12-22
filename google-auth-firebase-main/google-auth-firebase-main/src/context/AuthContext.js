import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup, 
  onAuthStateChanged, 
  signOut,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Sign In
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error; // Ném lỗi để component có thể xử lý
    }
  };

  // Github Sign In
  const githubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result;
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData.email;
        // Lấy các phương thức đăng nhập đã liên kết
        try {
          const signInMethods = await fetchSignInMethodsForEmail(auth, email);

          // Hiển thị thông báo cho người dùng
          alert(
            `Tài khoản này đã được đăng ký với phương thức: ${signInMethods.join(", ")}.`
          );
          
          console.error("Các phương thức đăng nhập đã liên kết:", signInMethods);
        } catch (fetchError) {
          console.error("Lỗi khi lấy phương thức đăng nhập:", fetchError);
        }
      } else {
        console.error("Lỗi khác:", error);
      }
      throw error; // Để đảm bảo lỗi được truyền tiếp
    }
  };

  // Sign Out
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  // Theo dõi trạng thái authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Các giá trị được chia sẻ qua context
  const value = {
    user,
    loading,
    googleSignIn,
    githubSignIn,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
