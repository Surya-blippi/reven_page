import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import FeaturesSection from './components/sections/FeaturesSection';
import Form from './components/Form';
import PortfolioSection from './components/sections/PortfolioSection';


const MainContent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (user) {
    return <Form />;
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navigation isScrolled={isScrolled} />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection /> 
      <FeaturesSection />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MainContent />
  </AuthProvider>
);

export default App;