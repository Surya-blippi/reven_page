import React, { useState, useEffect } from 'react';
import { 
  Zap, Clock, Brain, Users, CheckCircle,
  ChevronRight, Play, Search, Heart, ShoppingCart
} from 'lucide-react';

const RevenLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add title and description update
  useEffect(() => {
    document.title = 'Reven';
    document.querySelector('meta[name="description"]').setAttribute(
      'content', 
      'Quick & Quality Services'
    );
  }, []);

  const services = [
    {
      title: "Logo Design",
      time: "4 hours",
      price: "$10",
      description: "AI-powered logo creation with expert refinement",
      bgColor: "from-blue-500 to-purple-500"
    },
    {
      title: "Website Development",
      time: "1 day",
      price: "$100",
      description: "Professional sites built at lightning speed",
      bgColor: "from-purple-500 to-pink-500"
    },
    {
      title: "App Development",
      time: "3 days",
      price: "$300",
      description: "Full Stack mobile apps",
      bgColor: "from-pink-500 to-red-500"
    },
    {
      title: "AI Ads",
      time: "2 hours",
      price: "$20",
      description: "High-converting ads for all platforms",
      bgColor: "from-red-500 to-orange-500"
    }
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-[#DAFF00]" />,
      title: "Lightning Fast",
      description: "2-4 hour delivery on most services"
    },
    {
      icon: <Brain className="h-8 w-8 text-[#DAFF00]" />,
      title: "AI-Enhanced",
      description: "Cutting-edge AI for exceptional results"
    },
    {
      icon: <Users className="h-8 w-8 text-[#DAFF00]" />,
      title: "Expert Review",
      description: "Human experts verify every delivery"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-[#DAFF00]" />,
      title: "Guaranteed",
      description: "100% satisfaction or free revision"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Modern Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="text-2xl font-bold">Reven</div>
          <div className="hidden md:flex space-x-12">
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
          </div>
          <div className="flex items-center space-x-6">
            <Search className="w-6 h-6 cursor-pointer" />
            <Heart className="w-6 h-6 cursor-pointer" />
            <div className="relative">
              <ShoppingCart className="w-6 h-6 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-[#DAFF00] w-5 h-5 rounded-full flex items-center justify-center text-sm font-medium">
                0
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full mb-12">
                <span className="w-2.5 h-2.5 bg-[#DAFF00] rounded-full mr-2"></span>
                <span className="text-sm font-medium">Quick & Quality Services</span>
              </div>

              <h1 className="text-[5.5rem] leading-[1.1] font-bold mb-6">
                Get Work Done
                <br />
                <span className="relative inline-block">
                  <span className="bg-[#DAFF00] px-4 py-1">Faster</span>
                </span>
                <br />
                Than Ever
              </h1>

              <p className="text-gray-600 text-xl mb-12 max-w-lg">
                From logo designs to app development, we deliver professional results
                in hours, not days
              </p>

              <div className="flex items-center gap-12">
                <button className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-2 hover:gap-4 transition-all">
                  Start Project
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div>
                  <div className="text-5xl font-bold mb-1">40K+</div>
                  <div className="text-gray-500">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              {/* Rotating Banner */}
              <div className="absolute -top-6 -right-6 z-20">
                <div className="relative w-[300px] h-[80px]">
                  <div className="absolute inset-0 bg-black rounded-full transform -rotate-12"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white whitespace-nowrap overflow-hidden">
                    <div className="animate-scrollText w-full text-center px-4">
                      FAST DELIVERY • AI POWERED • EXPERT VERIFIED • 
                    </div>
                  </div>
                </div>
              </div>

              {/* Memoji Visual Area */}
              <div className="relative bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-[2rem] overflow-hidden aspect-[4/3] p-8">
                <img 
                  src="/memojis.png" 
                  alt="Team Memojis" 
                  className="absolute inset-0 w-full h-full object-contain z-10 scale-90 brightness-110 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} 
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-[400px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor}`}>
                  <div className="w-full h-full opacity-20" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-200 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-white">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.time}
                    </div>
                    <span className="font-bold text-white">{service.price}</span>
                  </div>
                  <button className="mt-4 bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center justify-center group-hover:bg-[#DAFF00] transition-colors">
                    Get Started <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Reven?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} 
                className="group p-8 rounded-3xl border border-gray-800 hover:border-[#DAFF00] transition-colors">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {['Company', 'Services', 'Resources', 'Legal'].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-6 text-lg">{section}</h3>
                <ul className="space-y-4">
                  <li className="hover:text-black cursor-pointer transition-colors text-gray-600">About Us</li>
                  <li className="hover:text-black cursor-pointer transition-colors text-gray-600">Careers</li>
                  <li className="hover:text-black cursor-pointer transition-colors text-gray-600">Contact</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-600">
            <div className="flex justify-center space-x-6 mb-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social.toLowerCase()}.com`}
                  className="hover:text-black transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
            © 2024 Reven. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RevenLanding;