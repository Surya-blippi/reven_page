import React from 'react';
import { footerLinks, socialLinks } from '../../constants/data';

const FooterSection = ({ title, links }) => (
  <div>
    <h3 className="font-semibold mb-6 text-lg">{title}</h3>
    <ul className="space-y-4">
      {links.map((link, index) => (
        <li key={index}>
          <a 
            href={link.url || "#"} 
            className="hover:text-black cursor-pointer transition-colors text-gray-600"
            aria-label={link.label || link}
          >
            {link.label || link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Footer Links Sections */}
        <div className="grid md:grid-cols-4 gap-12">
          {footerLinks.sections.map((section, index) => (
            <FooterSection 
              key={index}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
        
        {/* Social Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-600">
          <div className="flex justify-center space-x-6 mb-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                className="hover:text-black transition-colors"
                aria-label={`Follow us on ${social.label}`}
              >
                {social.label}
              </a>
            ))}
          </div>
          <p>© 2024 Reven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
