import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-white dark:from-gray-900 dark:via-primary-900/20 dark:to-gray-900">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back!</p>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-xl mb-3 focus:outline-none focus:border-primary-500 transition-all"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-xl mb-4 focus:outline-none focus:border-primary-500 transition-all"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;