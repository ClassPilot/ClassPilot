import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("teacher@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ If the user is already logged in, redirect to Dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: call your real API here
      // const { token } = await login(email, password);
      // localStorage.setItem("token", token);

      // Demo only
      await new Promise((r) => setTimeout(r, 500));
      localStorage.setItem("token", "demo_token"); // store a demo token
      navigate("/"); // go to dashboard
    } catch {
      setError("Email or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M12 3L1 8l11 5 9-4.091V17h2V8L12 3z" />
                <path d="M12 14L3.5 9.75V14c0 2.761 3.806 5 8.5 5s8.5-2.239 8.5-5V9.75L12 14z" fillOpacity=".2" />
              </svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 border-2 border-white"></span>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">ClassPilot</h1>
          <p className="text-gray-500 mt-1">Teaching made magical</p>
          <p className="text-gray-400 text-sm">Empowering educators, inspiring students</p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6">
          {/* Tabs (Sign in / Signup) */}
          <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              className="text-sm font-medium rounded-lg py-2 bg-white shadow-sm w-full"
            >
              Sign In
            </button>
            {/* ✅ clickable Create Account */}
            <Link
              to="/signup"
              className="text-sm font-medium rounded-lg py-2 text-gray-600 text-center w-full hover:text-violet-600"
            >
              Create Account
            </Link>
          </div>

          <form onSubmit={handleSubmit} noValidate autoComplete="on">
            {/* Email */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 12 4 6.01V6h16zM4 18V8l8 6 8-6v10H4z" /></svg>
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@gmail.com"
                autoComplete="email"
                required
                autoFocus
                className="w-full rounded-lg border border-gray-200 pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5"><path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm3 8H9V7a3 3 0 016 0v3z" /></svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                aria-invalid={!!error}
                aria-describedby={error ? "login-error" : undefined}
                className="w-full rounded-lg border border-gray-200 pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {error && (
              <p id="login-error" role="alert" className="mt-3 text-sm text-rose-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="mt-5 w-full rounded-lg py-2.5 text-white font-medium bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 shadow disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In to ClassPilot"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
