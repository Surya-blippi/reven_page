import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Zap, 
  Box, 
  BarChart3, 
  Settings, 
  Bell, 
  Menu,
  LogOut,
  Users,
  Clock,
  Palette,
  Globe,
  Search,
  Layout,
  PlusCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deliveryTimer, setDeliveryTimer] = useState(null);

  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { title: 'Dashboard', icon: <Layout />, active: true },
    { title: 'Projects', icon: <Box /> },
    { title: 'Services', icon: <Zap /> },
    { title: 'Analytics', icon: <BarChart3 /> },
  ];

  const services = [
    {
      title: "Logo Design",
      time: "2 hours",
      price: "₹499",
      description: "AI-powered logo creation with expert refinement",
      icon: <Palette />,
      bgcolor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Lead Generation",
      time: "3 hours",
      price: "₹1299",
      description: "Qualified leads with detailed company info",
      icon: <Users />,
      bgcolor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "AI Ad Creation",
      time: "2 hours",
      price: "₹1599",
      description: "High-converting ads for all platforms",
      icon: <Zap />,
      bgcolor: "bg-yellow-50",
      iconColor: "text-yellow-600"
    },
    {
      title: "Website Dev",
      time: "4 hours",
      price: "₹1999",
      description: "Professional sites built at lightning speed",
      icon: <Globe />,
      bgcolor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white fixed md:static top-0 bottom-0 ${isSidebarOpen ? 'left-0' : '-left-64'} md:left-0 w-64 transition-all duration-300 z-50`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <div className="text-2xl font-bold">Reven</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer mb-1
                  ${item.active ? 'bg-[#DAFF00] text-black' : 'hover:bg-gray-50'}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 p-2">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium truncate">{user?.displayName}</div>
                <div className="text-sm text-gray-500 truncate">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="bg-white h-16 flex items-center justify-between px-6 border-b">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <Menu />
          </button>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none outline-none"
              />
            </div>

            {/* Clock Display */}
            <div className="hidden lg:flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {currentTime.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </span>
              </div>
              {deliveryTimer && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Delivery in: {deliveryTimer}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DAFF00] rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <Settings className="cursor-pointer" />
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-black"
              >
                <LogOut />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Delivery Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Average Delivery</h3>
                  <p className="text-green-600 font-medium">2.5 Hours</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Projects Completed</h3>
                  <p className="text-blue-600 font-medium">24/7 Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium text-black">98%</span> on-time delivery
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Active Orders</h3>
                  <p className="text-purple-600 font-medium">Real-time Updates</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Active now</span>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Our Services</h2>
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#DAFF00] hover:text-black transition-colors">
                <PlusCircle className="w-4 h-4" />
                New Project
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className={`${service.bgcolor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <div className={service.iconColor}>{service.icon}</div>
                  </div>

                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{service.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {service.time}
                    </div>
                    <span className="font-bold">{service.price}</span>
                  </div>

                  <button 
                    onClick={() => {
                      const deliveryTime = parseInt(service.time);
                      setDeliveryTimer(`${deliveryTime}:00:00`);
                    }}
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-[#DAFF00] hover:text-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Start Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects Section */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold mb-4">Active Projects</h3>
            {/* Add active projects content */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;