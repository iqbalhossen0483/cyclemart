import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../Hook/useFirebase";

const LogIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const { logInWithGoogle, logInWithEmail } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state?.from.pathname || "/";

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    setLoading(true);
    const { email, password } = formData;
    logInWithEmail(email, password)
      .then(async () => {
        setError("");
        setFormData({ email: "", password: "" });
        navigate(url, { replace: true });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  //google
  const handleGoogleLogin = () => {
    setLoading(true);
    logInWithGoogle()
      .then(async () => {
        setError("");
        navigate(url, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 transform transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            </div>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-500" />
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 group-hover:border-gray-300 ${
                    formErrors.email
                      ? "border-red-300 focus:ring-red-500/20"
                      : "border-gray-200 focus:ring-blue-500/20 focus:border-blue-400"
                  }`}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
              </div>
              {formErrors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in">
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-500" />
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 group-hover:border-gray-300 ${
                    formErrors.password
                      ? "border-red-300 focus:ring-red-500/20"
                      : "border-gray-200 focus:ring-cyan-500/20 focus:border-cyan-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Forgot your password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md group"
            >
              <img src="/google.png" alt="google icon" className="size-7" />
              {loading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-xs">
          <p className="flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Protected by industry-standard encryption
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
          <p className="text-cyan-800 text-sm font-medium mb-2">
            Demo Credentials:
          </p>
          <p className="text-cyan-700 text-xs">
            Email: test@example.com
            <br />
            Password: password
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
