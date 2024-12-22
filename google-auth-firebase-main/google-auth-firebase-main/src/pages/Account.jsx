import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Rocket, LogOut, User, Star } from 'lucide-react';

const Account = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
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

      {/* Main content */}
      <div className="relative z-10 max-w-md mx-auto pt-12 p-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-gray-800"
                />
              ) : (
                <User size={40} className="text-white" />
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-6">
            Phi Hành Gia: {user?.displayName || 'Unknown Explorer'}
          </h1>

          <div className="space-y-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Rocket className="text-purple-400" />
                <div>
                  <h3 className="font-medium">Email Liên Lạc</h3>
                  <p className="text-gray-300">{user?.email}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <LogOut size={20} />
              <span>Rời Khỏi Trạm Vũ Trụ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;