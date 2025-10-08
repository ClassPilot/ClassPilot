import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema } from "../Schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ If already logged in, redirect to Dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 600));
      localStorage.setItem("token", "demo_token");
      navigate("/");
    } catch (err) {
      console.error(err);
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
              <Lock className="w-8 h-8 text-white" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 border-2 border-white"></span>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">ClassPilot</h1>
          <p className="text-gray-500 mt-1">Teaching made magical</p>
          <p className="text-gray-400 text-sm">
            Empowering educators, inspiring students
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              className="text-sm font-medium rounded-lg py-2 bg-white shadow-sm w-full"
            >
              Sign In
            </button>
            <Link
              to="/singup"
              className="text-sm font-medium rounded-lg py-2 text-gray-600 text-center w-full hover:text-violet-600"
            >
              Create Account
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative mb-4">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="email"
                type="email"
                placeholder="teacher@gmail.com"
                autoComplete="email"
                {...register("email")}
                className={`w-full rounded-lg border pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                  errors.email ? "border-rose-500" : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-rose-600 mb-3">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative mb-1">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password")}
                className={`w-full rounded-lg border pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                  errors.password ? "border-rose-500" : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-rose-600 mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
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
