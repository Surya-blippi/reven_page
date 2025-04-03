import React, { useState } from 'react';
import { ChevronRight, Zap, ExternalLink, Clock } from 'lucide-react';

const PortfolioSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Portfolio projects data
  const projects = [
    {
      id: 'reelquiz',
      title: 'Reel Quiz',
      tagline: 'Interactive Quiz Platform',
      url: 'https://reelquiznew.vercel.app/quiz',
      description: 'Feature-rich quiz platform with sleek UI, complete user authentication, and Supabase database integration.',
      deliveryTime: '15 hours',
      bgGradient: 'from-blue-600 to-indigo-600',
      techStack: ['React', 'Next.js', 'Supabase', 'Tailwind CSS'],
      features: ['User Authentication', 'Database Integration', 'Real-time Leaderboard', 'Interactive Quiz Creator']
    },
    {
      id: 'animalidentifier',
      title: 'Animal Identifier',
      tagline: 'AI-Powered Mobile App',
      url: 'https://play.google.com/store/apps/details?id=info.animalidentifier',
      description: 'Mobile application using advanced AI to identify animals from photos with payment integration.',
      deliveryTime: '2 days',
      bgGradient: 'from-purple-600 to-pink-600',
      techStack: ['Flutter', 'Firebase', 'Gemini AI', 'Stripe'],
      features: ['AI Image Recognition', 'Payment Processing', 'Offline Functionality', 'Available on Google Play']
    },
    {
      id: 'markbiz',
      title: 'MarkBiz Digital',
      tagline: 'Dubai-Based Agency Website',
      url: 'https://www.markbiz.digital/',
      description: 'Professional website for a Dubai-based digital marketing agency with backend form submission.',
      deliveryTime: '24 hours',
      bgGradient: 'from-emerald-500 to-teal-600',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
      features: ['Backend Form Submission', 'Multi-language Support', 'SEO Optimization', 'Analytics Dashboard']
    }
  ];

  // Function to open WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/918587880823', '_blank');
  };

  return (
    <div id="portfolio" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-gray-50"></div>
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#DAFF00]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-3 h-3 bg-[#DAFF00] rounded-full animate-bounce delay-100"></div>
      <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#DAFF00] rounded-full animate-bounce delay-500"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Simple Centered Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-black hover:bg-[#DAFF00] text-white hover:text-black px-5 py-2.5 rounded-full mb-6 cursor-pointer transition-all duration-300">
            <span className="w-2.5 h-2.5 bg-[#DAFF00] group-hover:bg-black rounded-full mr-2 transition-colors"></span>
            <span className="text-sm font-medium tracking-wider">Our Work</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Projects Delivered In Record Time</h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Quality websites and apps with rapid turnaround. Browse our recent projects that showcase our speed and quality.
          </p>
        </div>

        {/* Project Cards - Smaller Size */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {projects.map((project, idx) => (
            <div 
              key={project.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] ${
                idx === activeIndex ? 'ring-2 ring-[#DAFF00]' : ''
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              {/* Project Preview - iframe approach */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <iframe 
                  src={project.url} 
                  title={project.title}
                  className="absolute inset-0 w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity"
                  sandbox="allow-same-origin"
                  loading="lazy"
                ></iframe>
                
                {/* Overlay with project title as fallback */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${project.bgGradient} opacity-90 flex items-center justify-center`}>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{project.tagline}</span>
                  <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3 mr-1 text-gray-700" />
                    <span>{project.deliveryTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tech Stack Pills */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {project.techStack.map((tech, techIdx) => (
                    <span key={techIdx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-sm font-medium hover:text-[#DAFF00] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <ExternalLink className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              {/* Bottom Accent Line */}
              <div className={`h-1 w-full bg-gradient-to-r ${project.bgGradient}`}></div>
            </div>
          ))}
        </div>
        
        {/* Featured Project Details */}
        <div className="mb-16">
          {projects[activeIndex] && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Preview */}
                <div className="relative h-80 bg-gray-100 rounded-xl overflow-hidden">
                  <iframe 
                    src={projects[activeIndex].url} 
                    title={projects[activeIndex].title}
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-same-origin"
                    loading="lazy"
                  ></iframe>
                  
                  {/* Overlay with gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${projects[activeIndex].bgGradient} opacity-75 flex flex-col items-center justify-center p-6 text-center`}>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white mb-3">
                      {projects[activeIndex].tagline}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-3">{projects[activeIndex].title}</h3>
                    <div className="inline-flex items-center bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Delivered in {projects[activeIndex].deliveryTime}</span>
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div>
                  <h3 className="text-2xl font-bold mb-3">{projects[activeIndex].title}</h3>
                  <p className="text-gray-600 mb-6">{projects[activeIndex].description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeIndex].techStack.map((tech, techIdx) => (
                        <span key={techIdx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Features</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {projects[activeIndex].features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Zap className="w-4 h-4 text-[#DAFF00] mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href={projects[activeIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-black text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:bg-[#DAFF00] hover:text-black"
                  >
                    <span className="font-medium">View Live Project</span>
                    <ExternalLink className="w-4 h-4 group-hover:animate-pulse" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* CTA Section */}
        <div className="relative bg-black rounded-2xl overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-40">
            <div className="absolute top-20 left-20 w-40 h-40 rounded-full border border-white/20"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full border border-white/10"></div>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready for your next digital project?</h3>
            <p className="text-white/80 text-sm mb-6 max-w-xl mx-auto">
              Let's discuss your requirements and deliver something exceptional in record time.
            </p>
            
            <button
              onClick={openWhatsApp}
              className="group relative bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:gap-3 mx-auto transition-all duration-300 hover:bg-green-600 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25"></span>
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                <path d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zm0 19.908c-5.187 0-9.408-4.22-9.408-9.408S6.813 2.592 12 2.592s9.408 4.22 9.408 9.408-4.22 9.408-9.408 9.408z"></path>
              </svg>
              <span className="font-medium">Ping us on WhatsApp</span>
              <ChevronRight className="w-4 h-4 group-hover:animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;