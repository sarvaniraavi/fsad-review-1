import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "../../types";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState<"student" | "educator">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hashPassword = async (password: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid Gmail address (example@gmail.com).");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (!isLogin) {
      if (!name) {
        setError("Please enter your full name.");
        return false;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const hashedPassword = await hashPassword(password);

    if (isLogin) {
      const existingUser = storedUsers.find(
        (user: any) =>
          user.email === email &&
          user.password === hashedPassword &&
          user.role === role
      );

      if (!existingUser) {
        setError("Incorrect email, password, or role.");
        setIsLoading(false);
        return;
      }

      onLogin(existingUser);
    } else {
      const userExists = storedUsers.find(
        (user: any) => user.email === email
      );

      if (userExists) {
        setError("User already exists with this email.");
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=6366F1&color=fff`,
      };

      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
      onLogin(newUser);
    }

    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 grid lg:grid-cols-2">

      {/* LEFT BRANDING SECTION */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600 text-white text-xl font-bold shadow-lg">
            🎓
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Edu<span className="text-indigo-600">Learn</span>
          </h2>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
          Master New Skills <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Shape Your Future
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-md leading-relaxed">
          Join thousands of learners and educators on a journey of discovery.
          Access world-class courses or share your expertise today.
        </p>

        <div className="flex gap-6 mt-12">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">500+</h2>
            <p className="text-sm text-gray-500">Expert-led Courses</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">10k+</h2>
            <p className="text-sm text-gray-500">Active Learners</p>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Login to access your dashboard"
                : "Register to get started"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={role === "student" ? "default" : "outline"}
                  onClick={() => setRole("student")}
                  className="flex-1"
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant={role === "educator" ? "default" : "outline"}
                  onClick={() => setRole("educator")}
                  className="flex-1"
                >
                  Educator
                </Button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 text-red-600 text-sm p-3 rounded flex items-center gap-2"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isLogin && (
                <div>
                  <Label>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-100 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <Label>Email / Username</Label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 focus:bg-white"
                />
              </div>

              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter at least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-100 focus:bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-100 focus:bg-white"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading
                  ? isLogin
                    ? "Signing in..."
                    : "Creating account..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="text-indigo-600 ml-2 hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}