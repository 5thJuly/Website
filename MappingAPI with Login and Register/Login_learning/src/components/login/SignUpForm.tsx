import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, UserPlus, Shield, CheckCircle, XCircle } from 'lucide-react';
import authService from '../../services/authService';
import type { RegisterData } from '../../services/authService';

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
}

const SignupForm: React.FC<{ onSwitchToLogin: () => void}> = ({onSwitchToLogin}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const registerData: RegisterData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      const response = await authService.register(registerData);

      // Sử dụng message từ Backend
      if (response.success) {
        setSuccessMessage(response.message || 'Đăng ký thành công!');

        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      } else {
        setErrors({ api: response.message || 'Đăng ký thất bại. Vui lòng thử lại.' });
      }
    } catch (error: any) {
      console.error('Registration error:', error);

      // Xử lý error từ Backend
      let errorMessage = 'Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại.';

      if (error.response) {
        // Backend trả về error response
        const backendError = error.response.data;
        if (backendError && backendError.message) {
          errorMessage = backendError.message;
        } else if (error.response.status === 409) {
          errorMessage = 'Email đã tồn tại hoặc dữ liệu không hợp lệ.';
        } else if (error.response.status === 400) {
          errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.';
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
      }

      setErrors({ api: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4 lg:p-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-20 left-20 sm:top-40 sm:left-40 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/2 right-20 w-40 h-40 sm:w-60 sm:h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(window.innerWidth > 768 ? 25 : 12)].map((_, i) => (
              <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white opacity-25" />
              </div>
          ))}
        </div>

        {/* Mouse follower effect */}
        <div
            className="hidden md:block fixed w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full pointer-events-none transition-all duration-1000 ease-out"
            style={{
              left: mousePosition.x - (window.innerWidth >= 1024 ? 192 : 128),
              top: mousePosition.y - (window.innerWidth >= 1024 ? 192 : 128),
              transform: `scale(${isHovered ? 1.3 : 1})`,
              background: `radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)`
            }}
        ></div>

        <div
            className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          {/* Signup Card */}
          <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl transform transition-all duration-700 hover:scale-105 hover:bg-white/15 animate-slide-in-right`}>
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full mb-3 sm:mb-4 transform transition-all duration-500 hover:rotate-12">
                <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2" style={{background: 'linear-gradient(to right, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Create Account
              </h1>
              <p className="text-purple-200 text-sm sm:text-base">Join us and start your journey</p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 text-sm">{successMessage}</span>
                </div>
            )}

            {/* API Error Message */}
            {errors.api && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-300 text-sm">{errors.api}</span>
                </div>
            )}

            {/* Form Container */}
            <div className="space-y-4 sm:space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200 block">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 group-focus-within:text-white transition-colors duration-200" />
                  </div>
                  <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Choose a username"
                  />
                </div>
                {errors.username && (
                    <p className="text-red-400 text-xs sm:text-sm animate-pulse">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200 block">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 group-focus-within:text-white transition-colors duration-200" />
                  </div>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                    <p className="text-red-400 text-xs sm:text-sm animate-pulse">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200 block">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 group-focus-within:text-white transition-colors duration-200" />
                  </div>
                  <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Create a strong password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-white/10 rounded-r-xl transition-colors duration-200"
                  >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 hover:text-white" />
                    ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 hover:text-white" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                    i < passwordStrength
                                        ? passwordStrength <= 2
                                            ? 'bg-red-500'
                                            : passwordStrength <= 3
                                                ? 'bg-yellow-500'
                                                : 'bg-green-500'
                                        : 'bg-white/20'
                                }`}
                            />
                        ))}
                      </div>
                      <p className={`text-xs ${
                          passwordStrength <= 2 ? 'text-red-400' : passwordStrength <= 3 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'} Password
                      </p>
                    </div>
                )}

                {errors.password && (
                    <p className="text-red-400 text-xs sm:text-sm animate-pulse">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200 block">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 group-focus-within:text-white transition-colors duration-200" />
                  </div>
                  <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Confirm your password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-white/10 rounded-r-xl transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 hover:text-white" />
                    ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-purple-300 hover:text-white" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-400 text-xs sm:text-sm animate-pulse">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start space-x-2 text-xs sm:text-sm">
                <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 bg-white/10 border border-white/20 rounded focus:ring-indigo-500 text-indigo-500 transition-all duration-200"
                />
                <label htmlFor="terms" className="text-purple-200 leading-relaxed">
                  I agree to the{' '}
                  <button className="text-pink-300 hover:text-pink-200 transition-colors duration-200 hover:underline">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button className="text-pink-300 hover:text-pink-200 transition-colors duration-200 hover:underline">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                ) : (
                    'Create Account'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-4 sm:my-6 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-xs sm:text-sm text-purple-200">or</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Social Signup */}
            <div className="space-y-3">
              <button className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="hidden xs:inline">Sign up with Google</span>
                <span className="xs:hidden">Google</span>
              </button>
            </div>

            {/* Sign in link */}
            <p className="text-center text-xs sm:text-sm text-purple-200 mt-4 sm:mt-6">
              Already have an account?{' '}
              <button onClick={onSwitchToLogin}
                      className="text-pink-300 hover:text-pink-200 font-medium transition-colors duration-200 hover:underline">
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignupForm;