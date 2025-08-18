import { CheckCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../Hook/useFirebase";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const { logInWithGoogle, singUPWithEmail, userName } = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.from.pathname || "/";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

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

    if (!formData.rePassword) {
      errors.rePassword = "Please confirm your password";
    } else if (formData.password !== formData.rePassword) {
      errors.rePassword = "Passwords don't match";
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

    // Real-time password match validation
    if (name === "rePassword" || name === "password") {
      if (formErrors.rePassword && name === "password") {
        setFormErrors((prev) => ({ ...prev, rePassword: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    setLoading(true);
    const { name, email, password } = formData;
    singUPWithEmail(email, password)
      .then(async () => {
        setError("");
        userName(name);
        setFormData({ name: "", email: "", password: "", rePassword: "" });
        navigate(url, { replace: true });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleGoogleSignUp = () => {
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

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthMap = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-red-400" },
      2: { label: "Fair", color: "bg-yellow-400" },
      3: { label: "Good", color: "bg-cyan-400" },
      4: { label: "Strong", color: "bg-cyan-500" },
      5: { label: "Very Strong", color: "bg-teal-500" },
    };

    return { strength, ...strengthMap[strength] };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch =
    formData.password &&
    formData.rePassword &&
    formData.password === formData.rePassword;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Form Card */}
        <form className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 transform transition-all duration-300 hover:shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              <h1 className="text-4xl font-bold mb-2">Create Account</h1>
            </div>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-500" />
              Full Name
            </label>
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 group-hover:border-gray-300 ${
                  formErrors.name
                    ? "border-red-300 focus:ring-red-500/20"
                    : "border-gray-200 focus:ring-cyan-500/20 focus:border-cyan-400"
                }`}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 to-teal-400/0 group-hover:from-cyan-400/5 group-hover:to-teal-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>
            {formErrors.name && (
              <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in">
                {formErrors.name}
              </p>
            )}
          </div>

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
                    : "border-gray-200 focus:ring-cyan-500/20 focus:border-cyan-400"
                }`}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 to-teal-400/0 group-hover:from-cyan-400/5 group-hover:to-teal-400/5 transition-all duration-300 pointer-events-none"></div>
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
                placeholder="Create a password"
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
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 to-teal-400/0 group-hover:from-cyan-400/5 group-hover:to-teal-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}

            {formErrors.password && (
              <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in">
                {formErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-500" />
              Confirm Password
            </label>
            <div className="relative group">
              <input
                type={showRePassword ? "text" : "password"}
                name="rePassword"
                value={formData.rePassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 pr-12 border rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 group-hover:border-gray-300 ${
                  formErrors.rePassword
                    ? "border-red-300 focus:ring-red-500/20"
                    : passwordsMatch && formData.rePassword
                    ? "border-teal-300 focus:ring-teal-500/20 focus:border-teal-400"
                    : "border-gray-200 focus:ring-cyan-500/20 focus:border-cyan-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
              >
                {showRePassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {passwordsMatch && formData.rePassword && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-500" />
              )}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 to-teal-400/0 group-hover:from-cyan-400/5 group-hover:to-teal-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>

            {passwordsMatch && formData.rePassword && (
              <p className="text-teal-600 text-sm flex items-center gap-1 animate-fade-in">
                <CheckCircle className="w-4 h-4" />
                Passwords match
              </p>
            )}

            {formErrors.rePassword && (
              <p className="text-red-500 text-sm flex items-center gap-1 animate-fade-in">
                {formErrors.rePassword}
              </p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-xs text-gray-600 leading-relaxed">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="text-cyan-600 hover:text-cyan-700 underline"
                onClick={(e) => e.preventDefault()}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-cyan-600 hover:text-cyan-700 underline"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in">
              {error}
            </div>
          )}

          {/* Sign Up Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md group"
          >
            <img src="/google.png" alt="google icon" className="size-7" />
            {loading ? "Connecting..." : "Continue with Google"}
          </button>

          {/* Sign In Link */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/log-in"
                className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>

        {/* Security Features */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-500" />
            <span>Email verification</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-teal-500" />
            <span>Secure encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
