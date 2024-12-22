import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Rocket, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Space Station
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Trang chủ
            </Link>
            <Link to="/account" className="text-gray-300 hover:text-white transition-colors">
              Trạm vũ trụ
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user?.displayName ? (
              <div className="flex items-center gap-4">
                {/* User Avatar with Glow Effect */}
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-purple-500 ring-2 ring-purple-400 ring-opacity-50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                </div>

                {/* User Name */}
                <span className="text-gray-300 font-medium hidden sm:block">
                  {user.displayName}
                </span>

                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:block">Rời trạm</span>
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Rocket size={16} />
                Khám phá
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;