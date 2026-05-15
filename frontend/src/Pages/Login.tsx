import { useState, type ChangeEvent } from "react";
import {
  signInViaEmail,
  signUpViaEmail,
  viaGoogle,
} from "../services/auth.services";
import toast from "react-hot-toast";
import { useAuth } from "../Hooks/useAuth";

type Mode = "login" | "signup";

const Login = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { mutate: auth } = useAuth();

  const isSignup = mode === "signup";

  const handleAuth = async () => {
    try {
      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }

      if (isSignup) {
        if (password !== confirmPassword) {
          toast.error("Password does not match");
          return;
        }

        const res = await signUpViaEmail({ email, password });
        if (!res) return;

        await auth();

        toast.success("Account created successfully");
      } else {
        const res = await signInViaEmail({
          email,
          password,
        });

        await auth();

        if (!res) return;

        toast.success("Login successful");
      }
    } catch (err) {
      toast.error("auth failed");
      console.error(err);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const res = await viaGoogle();

      if (!res) {
        return;
      }

      await auth();

      toast.success("Google login successful");
    } catch (err) {
      toast.error("failed to login");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0d0d12] flex items-center justify-center px-4 py-12 overflow-hidden font-sans">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-sm bg-[#13131a] border border-[#2a2a38] rounded-2xl p-8 flex flex-col">
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-[10px] bg-[#1a1230] border border-[#2a2a38] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="9" height="9" rx="2" fill="#a78bfa" />
              <rect
                x="12"
                y="1"
                width="9"
                height="9"
                rx="2"
                fill="#7c3aed"
                opacity="0.6"
              />
              <rect
                x="1"
                y="12"
                width="9"
                height="9"
                rx="2"
                fill="#7c3aed"
                opacity="0.6"
              />
              <rect x="12" y="12" width="9" height="9" rx="2" fill="#a78bfa" />
            </svg>
          </div>
          <span className="text-[20px] font-bold text-[#f0eeff] tracking-tight">
            Hometown-Hub
          </span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#f0eeff] tracking-tight mb-1">
            {isSignup ? "Create account" : "Welcome back"}
          </h1>
          <p className="text-sm text-[#7b7a9a]">
            {isSignup
              ? "Start your journey today."
              : "Sign in to continue to your workspace."}
          </p>
        </div>

        <div className="flex bg-[#1a1a24] rounded-[10px] p-1 gap-1 mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-[7px] text-sm font-medium transition-all duration-150 cursor-pointer border-0
              ${
                mode === "login"
                  ? "bg-[#2d1f5e] text-[#c4b5fd]"
                  : "bg-transparent text-[#7b7a9a] hover:text-[#f0eeff]"
              }`}
          >
            Log in
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-[7px] text-sm font-medium transition-all duration-150 cursor-pointer border-0
              ${
                mode === "signup"
                  ? "bg-[#2d1f5e] text-[#c4b5fd]"
                  : "bg-transparent text-[#7b7a9a] hover:text-[#f0eeff]"
              }`}
          >
            Sign up
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#7b7a9a]">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-[10px] px-3.5 py-2.5 text-sm text-[#f0eeff] placeholder:text-[#4a4a62] outline-none focus:border-violet-600 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#7b7a9a]">
              Password
            </label>
            <input
              type="password"
              placeholder={isSignup ? "Min. 8 characters" : "••••••••"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-[10px] px-3.5 py-2.5 text-sm text-[#f0eeff] placeholder:text-[#4a4a62] outline-none focus:border-violet-600 transition-colors"
            />
          </div>
          {isSignup && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#7b7a9a]">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-[10px] px-3.5 py-2.5 text-sm text-[#f0eeff] placeholder:text-[#4a4a62] outline-none focus:border-violet-600 transition-colors"
              />
            </div>
          )}
          //todo:add forgot password
          {/* {!isSignup && (
            <div className="flex justify-end -mt-1">
              <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Forgot password?
              </a>
            </div>
          )} */}
          
          <button
            onClick={handleAuth}
            className="w-full py-3 mt-1 rounded-[10px] text-white text-sm font-semibold tracking-tight cursor-pointer border-0
              bg-linear-to-br from-violet-600 to-violet-800
              shadow-[0_0_24px_rgba(124,58,237,0.35)]
              hover:opacity-90 active:scale-[0.98] transition-all duration-150"
          >
            {isSignup ? "Create account" : "Sign in"} →
          </button>
          <div className="flex items-center gap-2.5">
            <span className="flex-1 h-px bg-[#2a2a38]" />
            <span className="text-[11px] text-[#7b7a9a] whitespace-nowrap">
              or continue with
            </span>
            <span className="flex-1 h-px bg-[#2a2a38]" />
          </div>
          <button
            onClick={handleGoogleAuth}
            className="w-full py-2.5 flex items-center justify-center gap-2.5 rounded-[10px]
              bg-transparent border border-[#2a2a38] text-[#f0eeff] text-sm font-medium cursor-pointer
              hover:bg-[#1a1a24] active:scale-[0.98] transition-all duration-150"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 18 18"
              className="shrink-0"
            >
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.616z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </div>

        <p className="text-center text-xs text-[#7b7a9a] mt-6">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setMode(isSignup ? "login" : "signup")}
            className="text-violet-400 font-medium hover:text-violet-300 transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
