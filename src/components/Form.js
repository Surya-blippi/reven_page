import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabaseClient';
import { 
  Clock, 
  Palette, 
  Globe, 
  Smartphone, 
  Zap,
  ChevronRight,
  MessageCircle,
  Check,
  AlertCircle,
  ChevronDown,
  Loader2
} from 'lucide-react';

const Form = () => {
  const { user } = useAuth();
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [willingToPay, setWillingToPay] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      id: 'logo',
      name: 'Logo Design',
      timeline: '4 hours',
      price: '499',
      priceLabel: 'Starts at ₹499',
      icon: <Palette className="w-5 h-5" />,
      bgColor: 'bg-violet-100',
      iconColor: 'text-violet-600',
      note: 'Price may vary based on complexity and customization requirements'
    },
    {
      id: 'website',
      name: 'Website Development',
      timeline: '1 day',
      price: '1999',
      priceLabel: 'Starts at ₹1,999',
      icon: <Globe className="w-5 h-5" />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      note: 'Price varies based on features and complexity (Landing Page/Full Stack)'
    },
    {
      id: 'app',
      name: 'App Development',
      timeline: '3 days',
      price: '4999',
      priceLabel: 'Starts at ₹4,999',
      icon: <Smartphone className="w-5 h-5" />,
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      note: 'Price depends on platform (iOS/Android) and features'
    }
  ];

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
  ];

  const validatePhone = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!value) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!phoneRegex.test(value)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
    validatePhone(value);
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      const isSelected = prev.includes(serviceId);
      if (!isSelected) {
        return [...prev, serviceId];
      } else {
        const newServiceDetails = { ...serviceDetails };
        delete newServiceDetails[serviceId];
        return prev.filter(id => id !== serviceId);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) return;

    setIsSubmitting(true);
    try {
      const orderData = {
        user_id: user.uid,
        user_name: user.displayName,
        user_email: user.email,
        phone: `${countryCode}${phone}`,
        selected_services: selectedServices,
        service_details: serviceDetails,
        status: 'pending'
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      alert('Order submitted successfully! Our team will contact you shortly.');
      
      // Reset form
      setSelectedServices([]);
      setServiceDetails({});
      setPhone('');
      setWillingToPay(false);

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#DAFF00] px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Quality Work Delivered Faster</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Complete Your Order</h1>
          <p className="text-gray-600">Let's understand your requirements better</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">Select Services</h2>
            <div className="grid gap-6">
              {services.map(service => (
                <div key={service.id} className="space-y-4">
                  <div 
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md
                      ${selectedServices.includes(service.id)
                        ? 'border-[#DAFF00] bg-[#DAFF00]/5'
                        : 'border-gray-100'
                      }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <div className="flex items-center">
                      <div className={`${service.bgColor} p-3 rounded-lg mr-4`}>
                        {service.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium">{service.name}</h3>
                          <span className="font-bold">{service.priceLabel}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Delivered within {service.timeline}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {service.note}
                        </div>
                      </div>
                      <Check className={`ml-4 w-5 h-5 transition-opacity ${
                        selectedServices.includes(service.id) 
                          ? 'opacity-100 text-green-500' 
                          : 'opacity-0'
                      }`} />
                    </div>
                  </div>

                  {selectedServices.includes(service.id) && (
                    <div className="pl-4 space-y-4 animate-fadeIn">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tell us about your requirements
                        </label>
                        <textarea
                          value={serviceDetails[service.id] || ''}
                          onChange={(e) => setServiceDetails(prev => ({
                            ...prev,
                            [service.id]: e.target.value
                          }))}
                          placeholder={`Describe your ${service.name.toLowerCase()} requirements in detail...`}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DAFF00] min-h-[100px]"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  value={user?.displayName || ''} 
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex gap-2">
                  <div className="relative">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="appearance-none w-28 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DAFF00] bg-white pr-8"
                    >
                      {countryCodes.map(({ code, country }) => (
                        <option key={code} value={code}>
                          {code} {country}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      placeholder="Enter your 10-digit phone number"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#DAFF00] ${
                        phoneError ? 'border-red-300' : 'border-gray-200'
                      }`}
                      required
                    />
                    {phoneError && (
                      <div className="absolute -bottom-6 left-0 text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {phoneError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Agreement */}
          <div className="mb-12 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-4">
              <MessageCircle className="w-5 h-5 text-violet-600 mt-1 flex-shrink-0" />
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Someone from our team will reach out to you shortly on your provided phone number.
                </p>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="paymentAgreement"
                    checked={willingToPay}
                    onChange={(e) => setWillingToPay(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                  />
                  <label htmlFor="paymentAgreement" className="ml-3 text-sm text-gray-600">
                    I understand that I'll need to pay once the order is confirmed. Payment will be required to start the timer. Final pricing will be confirmed based on requirements.
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isSubmitting ||
              selectedServices.length === 0 || 
              !willingToPay || 
              !phone ||
              phoneError ||
              selectedServices.some(id => !serviceDetails[id])
            }
            className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#DAFF00] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Request
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;