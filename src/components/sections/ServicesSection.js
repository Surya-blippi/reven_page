import React from 'react';
import { 
  Clock, 
  ChevronRight, 
  Globe,
  Smartphone,
  Zap,
  Timer
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Reduced services array to only include website and app development
const services = [
  {
    id: 'website',
    title: 'Website Development',
    time: '1 day',
    speed: 'Rapid 24-hour turnaround!',
    description: 'Quality websites delivered in record time',
    bgColor: 'from-blue-500 to-indigo-500',
    icon: <Globe className="h-10 w-10 text-white" />,
    speedIcon: <Timer className="h-4 w-4 text-amber-400" />
  },
  {
    id: 'app',
    title: 'App Development',
    time: '3 days',
    speed: 'Swift 3-day development!',
    description: 'Fast-track your app development journey',
    bgColor: 'from-emerald-500 to-green-500',
    icon: <Smartphone className="h-10 w-10 text-white" />,
    speedIcon: <Timer className="h-4 w-4 text-amber-400" />
  }
];

const ServiceCard = ({ service, onGetStarted }) => {
  const { title, time, speed, description, bgColor, icon, speedIcon } = service;
  
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-[360px]">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgColor}`}>
        <div className="w-full h-full opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>

      {/* Content */}
      <div className="relative h-full z-20 p-6 flex flex-col">
        {/* Icon Container */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transform hover:scale-105 transition-all duration-300">
            {icon}
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex-grow text-center">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-200 text-sm mb-3">{description}</p>
          <div className="flex items-center justify-center gap-1.5 text-amber-400">
            {speedIcon}
            <span className="text-xs font-medium">{speed}</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto space-y-3">
          <div className="flex justify-center items-center bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center text-white">
              <Clock className="h-4 w-4 mr-1.5" />
              <span className="text-sm">{time}</span>
            </div>
          </div>
          
          {/* Get Started Button - kept the same but now calls WhatsApp function */}
          <button
            onClick={onGetStarted}
            className="w-full bg-white text-black px-4 py-2.5 rounded-lg font-medium flex items-center justify-center hover:bg-[#DAFF00] transition-all duration-300"
          >
            <span>Get Started</span>
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  // Function to open WhatsApp instead of using signInWithGoogle
  const openWhatsApp = () => {
    window.open('https://wa.me/918587880823', '_blank');
  };

  return (
    <div id="services" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-black/5 px-3 py-1.5 rounded-full mb-4">
            <Zap className="w-4 h-4 text-amber-500 mr-1.5" />
            <span className="text-sm font-medium">Lightning-Fast Delivery</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of speed, quality, and affordability
          </p>
        </div>

        {/* Services Grid - now using two columns for the two services */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              service={service} 
              onGetStarted={openWhatsApp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;