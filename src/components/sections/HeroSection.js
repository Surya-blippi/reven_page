import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Importing useAuth

const HeroSection = () => {
  const { user, logout } = useAuth(); // Removed signInWithGoogle as we're replacing it

  // Function to open WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/919876543210', '_blank');
  };

  return (
    <div className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#DAFF00]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="relative">
            {/* Year Tag */}
            <div className="group inline-flex items-center bg-black hover:bg-[#DAFF00] text-white hover:text-black px-5 py-2.5 rounded-full mb-12 cursor-pointer transition-all duration-300">
              <span className="w-2.5 h-2.5 bg-[#DAFF00] group-hover:bg-black rounded-full mr-2 transition-colors"></span>
              <span className="text-sm font-medium tracking-wider">#2025</span>
            </div>

            {/* Heading */}
            <div className="relative">
              <h1 className="text-[4.7rem] leading-[1.1] font-bold mb-6">
                <span className="block transform hover:translate-x-2 transition-transform duration-300">Work Done</span>
                <span className="relative inline-block">
                  <span className="relative z-10 bg-[#DAFF00] px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300 transform -rotate-1 hover:rotate-0">
                    Faster
                  </span>
                </span>
                <span className="block transform hover:translate-x-2 transition-transform duration-300">Than Ever</span>
              </h1>

              {/* Improved delivery message with better spacing and visual hierarchy */}
              <div className="text-gray-600 text-xl mb-12 max-w-lg">
                <div className="flex items-center mb-2">
                  <Zap className="w-6 h-6 text-[#DAFF00] mr-2 fill-[#DAFF00]" />
                  <span className="font-semibold text-black">Websites & Apps delivered in 24 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 mr-2"></div> {/* Spacer for alignment */}
                  <span>No need to wait. Get your project quickly at an affordable price.</span>
                </div>
              </div>

              {/* Conditional CTA Buttons */}
              <div className="flex items-center gap-12">
                {user ? (
                  <>
                    {/* Logout Button */}
                    <button
                      onClick={logout}
                      className="group bg-black text-white px-8 py-4 rounded-full flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:bg-[#DAFF00] hover:text-black transform hover:scale-105"
                    >
                      <span className="font-medium">Logout</span>
                      <ChevronRight className="w-5 h-5 group-hover:animate-pulse" />
                    </button>
                    
                    <div className="flex flex-col items-center">
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full"
                      />
                      <span className="text-gray-500 font-medium">{user.displayName}</span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* WhatsApp Button */}
                    <button
                      onClick={openWhatsApp}
                      className="group relative bg-green-500 text-white px-8 py-4 rounded-full flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:bg-green-600 hover:text-white transform hover:scale-105 shadow-lg"
                    >
                      {/* Animated pulse effect behind button */}
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25"></span>
                      
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
                    
                    <div className="group cursor-pointer">
                      <div className="text-5xl font-bold mb-1 group-hover:text-[#9d00ff] transition-colors">300+</div>
                      <div className="text-gray-500 group-hover:text-black transition-colors">Happy Clients</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            {/* Memoji Visual Area */}
            <div className="relative bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-[2rem] overflow-hidden group transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
              {/* Glass Effect */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              
              <div className="relative p-8">
                {/* Image Container */}
                <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/memojis.png" 
                    alt="Team Memojis" 
                    className="w-full h-full object-contain brightness-105 contrast-105"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/50 via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Speed badge */}
                <div className="absolute top-6 right-6 bg-[#DAFF00] text-black px-4 py-1 rounded-full flex items-center shadow-lg z-20 transform rotate-6 hover:rotate-0 transition-transform">
                  <Zap className="w-4 h-4 mr-1 fill-black" />
                  <span className="font-bold text-sm">24hr delivery</span>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#DAFF00]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-[#DAFF00] rounded-full animate-bounce delay-100"></div>
      <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#DAFF00] rounded-full animate-bounce delay-500"></div>
    </div>
  );
};

export default HeroSection;