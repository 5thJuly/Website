// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA6pAleKU1bN8zwfOp_Ok3xMTToX4YfMcE",
  authDomain: "oauth-2fa1c.firebaseapp.com",
  projectId: "oauth-2fa1c",
  storageBucket: "oauth-2fa1c.firebasestorage.app",
  messagingSenderId: "55331178319",
  appId: "1:55331178319:web:737732c0d651d7636ae73a",
  measurementId: "G-XM3PN5MVPY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { auth, provider };