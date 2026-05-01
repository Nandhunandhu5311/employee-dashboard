import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#9C92AC_1px,transparent_1px)] [background-size:30px_30px]"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl rotate-12 opacity-20 blur-xl"></div>
        <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-500 rounded-2xl -rotate-12 opacity-20 blur-xl"></div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-8 pt-8 pb-12 text-center">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent"></div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                <Sparkles className="w-8 h-5 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
               Admin Login
              </h2>

              <p className="text-blue-100 text-sm">
                Sign in to continue your journey
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
              <svg
                viewBox="0 0 1440 48"
                className="w-full h-12 text-white/80 dark:text-gray-800/80"
                preserveAspectRatio="none"
              >
                <path fill="currentColor" d="M0,32L1440,0L1440,48L0,48Z"></path>
              </svg>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 pb-8 pt-3 space-y-4">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                    errors.email
                      ? "border-red-300"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500 animate-shake">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>

              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                    errors.password
                      ? "border-red-300"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500 animate-shake">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot */}
            <div className="text-right">
              <button
                onClick={() => alert("Password reset feature coming soon")}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Demo */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Demo credentials: any@email.com / any password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;