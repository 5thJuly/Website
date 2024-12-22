import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Rocket, Mail, Lock, Eye, EyeOff, Star, Github } from 'lucide-react';
// import { auth, provider } from '../firebase';
// import { signInWithPopup } from 'firebase/auth';

const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { googleSignIn, user, githubSignIn } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate('/account');
    }
  }, [navigate, user]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      setErrors({ google: 'Đăng nhập với Google thất bại. Vui lòng thử lại.' });
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
      navigate('/account');
    } catch (error) {
      setErrors({ github: 'Đăng nhập với Github thất bại. Vui lòng thử lại.' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
      } catch (error) {
        setErrors({ submit: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center relative overflow-hidden p-4">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 4 + 2}
            className="absolute text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="w-full max-w-md relative">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Rocket size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Khám Phá Vũ Trụ
            </h1>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Đăng nhập với Google</span>
            </button>
            
            <button
              onClick={handleGithubSignIn}
              className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Github size={20} />
              <span>Đăng nhập với Github</span>
            </button>
          </div>

          {/* Error Messages */}
          {(errors.google || errors.github) && (
            <div className="mb-6 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-sm">
              {errors.google || errors.github}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                Hoặc đăng nhập với email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="commander@space.station"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                isSubmitting
                  ? 'bg-purple-600/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Đang khởi động...</span>
                </div>
              ) : (
                'Bắt đầu hành trình'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;