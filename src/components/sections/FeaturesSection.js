import React from 'react';
import { Zap, Brain, Users, CheckCircle } from 'lucide-react';
import { features } from '../../constants/data';

const iconMap = {
  Zap: Zap,
  Brain: Brain,
  Users: Users,
  CheckCircle: CheckCircle
};

const FeatureCard = ({ feature }) => {
  const { icon, title, description } = feature;
  const Icon = iconMap[icon];
  
  return (
    <div className="group p-8 rounded-3xl border border-gray-800 hover:border-[#DAFF00] transition-colors">
      <div className="mb-6">
        <Icon className="h-8 w-8 text-[#DAFF00]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div id="features" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Reven?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>

      {/* Footer - All Rights Reserved */}
      <div className="text-center mt-16">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Reven. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FeaturesSection;
