import React, { useState, useEffect } from 'react';
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
  Loader2,
  Timer,
  Star,
  DollarSign,
  Archive,
  LogOut
} from 'lucide-react';

const Form = () => {
  const { user, logout } = useAuth();
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState({});
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [willingToPay, setWillingToPay] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingOrders, setExistingOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const services = [
    {
      id: 'logo',
      name: 'Logo Design',
      timeline: '4 hours',
      speed: 'Express 4-hour delivery!',
      price: '10',
      priceLabel: 'Starts at $10',
      icon: <Palette className="w-5 h-5" />,
      bgColor: 'bg-violet-100',
      iconColor: 'text-violet-600',
      note: 'Professional logos, lightning-fast delivery, unbeatable prices',
      speedIcon: <Zap className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'website',
      name: 'Website Development',
      timeline: '1 day',
      speed: 'Rapid 24-hour turnaround!',
      price: '100',
      priceLabel: 'Starts at $100',
      icon: <Globe className="w-5 h-5" />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      note: 'Quality websites delivered in record time',
      speedIcon: <Timer className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'app',
      name: 'App Development',
      timeline: '3 days',
      speed: 'Swift 3-day development!',
      price: '300',
      priceLabel: 'Starts at $300',
      icon: <Smartphone className="w-5 h-5" />,
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      note: 'Fast-track your app development journey',
      speedIcon: <Timer className="w-4 h-4 text-amber-500" />
    },
    {
        id: 'ai-ads',
        name: 'AI Ads',
        timeline: '2 hours',
        speed: 'Quick 2-hour delivery!',
        price: '20',
        priceLabel: 'Starts at $20',
        icon: <Zap className="w-5 h-5" />,
        bgColor: 'bg-amber-100',
        iconColor: 'text-amber-600',
        note: 'AI-powered ad creatives that convert',
        speedIcon: <Timer className="w-4 h-4 text-amber-500" />
      }
  ];

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Fetch existing orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.uid)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setExistingOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

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
        setServiceDetails(newServiceDetails);
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
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

      // Refresh orders list
      const { data: newOrders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.uid)
        .order('created_at', { ascending: false });

      setExistingOrders(newOrders || []);

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

  const OrderSummary = ({ orders }) => {
    return (
      <div className="mb-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Archive className="w-5 h-5 text-violet-600" />
          <h2 className="text-xl font-semibold">Your Previous Orders</h2>
        </div>
        
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-gray-500">
                    Order Date: {new Date(order.created_at).toLocaleDateString()}
                  </div>
                  <div className="font-medium">
                    Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Contact:</div>
                  <div className="text-sm text-gray-500">{order.phone}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Selected Services:</div>
                {order.selected_services.map((serviceId, idx) => {
                  const service = services.find(s => s.id === serviceId);
                  return (
                    <div key={idx} className="bg-white p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`${service?.bgColor} p-2 rounded-lg`}>
                          {service?.icon}
                        </div>
                        <div>
                          <div className="font-medium">{service?.name}</div>
                          <div className="text-sm text-gray-500">
                            {order.service_details[serviceId]}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Greeting Section */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <img 
                src={user.photoURL}
                alt={user.displayName}
                className="w-14 h-14 rounded-full border-2 border-[#DAFF00]"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-violet-100 border-2 border-[#DAFF00] flex items-center justify-center">
                <span className="text-xl font-medium text-violet-600">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">
                Welcome, {user?.displayName?.split(' ')[0] || 'there'}! 👋
              </h2>
              <p className="text-gray-600">Let's create something amazing today</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Show loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
          </div>
        ) : (
          <>
            {/* Show order summary if exists */}
            {existingOrders.length > 0 && (
              <OrderSummary orders={existingOrders} />
            )}

            {/* Enhanced Header */}
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center bg-[#DAFF00] px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Lightning-Fast Delivery</span>
              </div>
              
              <h1 className="text-4xl font-bold">Complete Your Order</h1>
              
              <div className="flex justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-violet-600" />
                  <span>Rapid Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Competitive Pricing</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              {/* Services Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Select Services</h2>
                <p className="text-gray-600 mb-6">Experience the perfect blend of speed, quality, and affordability</p>
                
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
                            
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="mr-2">Delivered within {service.timeline}</span>
                              <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-xs font-medium">
                                {service.speedIcon}
                                {service.speed}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
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

                      {/* Service Details Input */}
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

              {/* Contact Information Section */}
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

              {/* Agreement Section */}
              <div className="mb-12 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-5 h-5 text-violet-600 mt-1 flex-shrink-0" />
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Our expert team will reach out to you shortly to discuss your requirements and provide a customized quote.
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
                        I understand that the final pricing will be based on my specific requirements. Payment will be required to start the project timer.
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
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Request
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;