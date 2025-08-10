"use client";
import { useSignup } from "@/app/Hooks/useSignUp";
import { useSignIn } from "@/app/Hooks/useSignIn";
import { useAppDispatch } from "@/app/Redux_Store/store/store";
import { setUser } from "@/app/Redux_Store/store/authSlice";
import {  useEffect, useState } from "react";
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";

const LoginSignup = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>("");
  const [newMessage, setNewMessage] = useState();
  const { signupWithEmail } = useSignup();
  const { signInWithEmail } = useSignIn();
  const dispatch = useAppDispatch();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const isSignInDisabled = !email || !password;
  const isSignUpDisabled = !name || !email || !password;

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const HandleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (isSignUpDisabled) return;

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    const { user, error } = await signupWithEmail(email, password);
    if (user) {
       const successMsg =
         "Signup successful! Please check your email for verification.";
       localStorage.setItem("signupMessage", successMsg);
      const msg: string | null = localStorage.getItem("signupMessage");
      setMessage(msg);
      setName("");
      setEmail("");
      setPassword("");
      
      setIsSignUp(false);
      // Save user to backend
    } else if (error) {
      if (error.includes("auth/email-already-in-use")) {
        setIsSignUp(false);
        setMessage("This email is already registered. Please log in.");
      } else if (error.includes("auth/weak-password")) {
        setMessage("Password should be at least 6 characters.");
      } else if (error.includes("auth/invalid-email")) {
        setMessage("Please enter a valid email address.");
      } else {
        setMessage("Signup failed. Please try again.");
      }
      console.log(error);
    }
  };

useEffect(() => {
  if (!isSignUp) {
    const msg: string | null = localStorage.getItem("signupMessage");
    if (msg) {
      setMessage(msg);
    }
  }
}, [isSignUp]);

  const HandleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }
    const { user, error } = await signInWithEmail(email, password);
    if (user) {
      localStorage.removeItem("signupMessage");
      setMessage("Login successful!");

      console.log(user);
      const token = await user.getIdToken();
      console.log(token);
      dispatch(
        setUser({
          email: user.email ?? "",
          uid: user.uid,
          token: token,
          emailVerified: user.emailVerified,
        })
      );
    } else if (error) {
      if (error.includes("auth/invalid-credential")) {
        setMessage("Invalid password or email");
      } else if (error.includes("auth/user-not-found")) {
        setMessage("No account found with this email.");
      } else if (error.includes("auth/invalid-email")) {
        setMessage("Invalid email");
      } else {
        setMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/50 text-white px-4">
      <div className="relative w-full max-w-4xl h-[500px] bg-neutral-900 rounded-xl shadow-xl overflow-hidden border border-neutral-700">
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 p-8 flex flex-col justify-center transition-all duration-700 ease-in-out ${
            isSignUp ? "translate-x-full opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <h2 className="text-3xl font-bold text-center">Create Account</h2>
          <div className="flex justify-center mt-4 space-x-4">
            {[FaGoogle, FaLinkedin, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 border border-neutral-600 rounded-full hover:bg-white hover:text-black transition"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="mt-4 text-center text-gray-400">
            or use your email for registration
          </p>
          <form
            className="flex flex-col mt-4 space-y-4"
            onSubmit={HandleCreateAccount}
          >
            <input
              required
              type="text"
              placeholder="Name"
              className="p-3 bg-neutral-800 border border-neutral-600 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="p-3 bg-neutral-800 border border-neutral-600 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="p-3 bg-neutral-800 border border-neutral-600 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={HandleCreateAccount}
              disabled={isSignUpDisabled}
              className={`px-4 py-2 font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition ${
                isSignUpDisabled && "opacity-50 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 p-8 flex flex-col justify-center transition-all duration-700 ease-in-out ${
            isSignUp ? "opacity-0 z-10" : "opacity-100 z-20"
          }`}
        >
          <h2 className="text-3xl font-bold text-center">Sign In</h2>
          <div className="flex justify-center mt-4 space-x-4">
            {[FaGoogle, FaLinkedin, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 border border-neutral-600 rounded-full hover:bg-white hover:text-black transition"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="mt-4 text-center text-gray-400">
            or use your email account
          </p>
          {message ? (
            <p className="text-green-500 text-center mt-2">{message}</p>
          ) : (
            ""
          )}
          <p className="text-green-500 text-center mt-2">{newMessage}</p>
          
          <form className="flex flex-col mt-4 space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 bg-neutral-800 border border-neutral-600 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 bg-neutral-800 border border-neutral-600 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              href="#"
              className="text-sm text-right text-gray-400 hover:underline"
            >
              Forgot your password?
            </a>
            <button
              type="submit"
              onClick={HandleSignIn}
              disabled={isSignInDisabled}
              className={`px-4 py-2 font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition ${
                isSignInDisabled && "opacity-50 cursor-not-allowed"
              }`}
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-neutral-800 transition-transform duration-700 ease-in-out rounded-xl z-30 ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="w-full h-full flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-3xl font-bold mb-4">
              {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            </h1>
            <p className="text-gray-400 mb-6">
              {isSignUp
                ? "To keep connected, please login with your personal info"
                : "Enter your personal details and start your journey with us"}
            </p>
            <button
              onClick={toggleForm}
              className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
