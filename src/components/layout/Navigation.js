import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Importing useAuth for authentication

const Navigation = ({ isScrolled }) => {
  const { user, logout } = useAuth(); // Updated to remove signInWithGoogle as we're not using it anymore

  // Function to open WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/918587880823', '_blank');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">Reven</div>

        {/* Conditional Buttons */}
        <div>
          {user ? (
            <div className="flex items-center gap-6">
              {/* Logout Button */}
              <button
                onClick={logout}
                className="group bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:bg-[#DAFF00] hover:text-black transform hover:scale-105"
              >
                <span className="font-medium">Logout</span>
                <ChevronRight className="w-5 h-5 group-hover:animate-pulse" />
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-700 font-medium">{user.displayName}</span>
              </div>
            </div>
          ) : (
            /* WhatsApp Button */
            <button
              onClick={openWhatsApp}
              className="group bg-green-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:bg-green-600 transform hover:scale-105"
            >
              {/* WhatsApp Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zm0 19.908c-5.187 0-9.408-4.22-9.408-9.408S6.813 2.592 12 2.592s9.408 4.22 9.408 9.408-4.22 9.408-9.408 9.408z"></path>
              </svg>
              <span className="font-medium">Ping now</span>
              <ChevronRight className="w-5 h-5 group-hover:animate-pulse" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;