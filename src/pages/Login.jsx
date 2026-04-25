import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const isAuthenticated = loginUser(email, password);

    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Try: user@example.com / 123456");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-500/20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            WELCOME BACK
          </h2>
          <p className="text-slate-400 mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-300 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-900/30 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            LOGIN
          </button>
        </form>

        <p className="text-slate-500 text-xs text-center mt-6">
          Demo credentials: user@demo.com / 123456
        </p>
      </div>
    </div>
  );
};

export default Login;