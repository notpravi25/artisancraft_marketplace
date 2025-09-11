import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('buyer'); // 'buyer' or 'artisan'
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      
      const savedUserType = localStorage.getItem('userType') || 'buyer';
      setUserType(savedUserType);
    };

    checkAuth();
    
    // Simulate cart count
    const savedCartCount = localStorage.getItem('cartCount') || '0';
    setCartItemCount(parseInt(savedCartCount));
  }, []);

  const navigationItems = [
    {
      label: 'Browse',
      path: '/product-details',
      icon: 'Search',
      visible: true,
      tooltip: 'Discover authentic handcrafted products'
    },
    {
      label: userType === 'artisan' ? 'Create' : 'Shop',
      path: userType === 'artisan' ? '/product-upload-wizard' : '/product-details',
      icon: userType === 'artisan' ? 'Plus' : 'ShoppingBag',
      visible: true,
      tooltip: userType === 'artisan' ? 'Upload your handcrafted products' : 'Shop for unique crafts'
    },
    {
      label: 'Cart',
      path: '/shopping-cart',
      icon: 'ShoppingCart',
      visible: userType === 'buyer',
      badge: cartItemCount > 0 ? cartItemCount : null,
      tooltip: 'View your selected items'
    },
    {
      label: 'Account',
      path: '/user-profile-settings',
      icon: 'User',
      visible: isAuthenticated,
      tooltip: 'Manage your profile and preferences'
    }
  ];

  const userMenuItems = [
    {
      label: 'Profile Settings',
      path: '/user-profile-settings',
      icon: 'Settings',
      visible: true
    },
    {
      label: userType === 'buyer' ? 'Switch to Artisan' : 'Switch to Buyer',
      action: () => {
        const newUserType = userType === 'buyer' ? 'artisan' : 'buyer';
        setUserType(newUserType);
        localStorage.setItem('userType', newUserType);
        setIsUserMenuOpen(false);
      },
      icon: 'RefreshCw',
      visible: isAuthenticated
    },
    {
      label: 'Help & Support',
      path: '/help',
      icon: 'HelpCircle',
      visible: true
    },
    {
      label: 'Sign Out',
      action: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        setIsAuthenticated(false);
        setIsUserMenuOpen(false);
        navigate('/buyer-login');
      },
      icon: 'LogOut',
      visible: isAuthenticated
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    // Voice control implementation would go here
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:opacity-80 transition-micro"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Palette" size={20} color="var(--color-primary-foreground)" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                ArtisanCraft
              </h1>
              <p className="text-xs font-caption text-muted-foreground -mt-1">
                Marketplace
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.filter(item => item?.visible)?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth hover:bg-muted group ${
                isActivePath(item?.path) ? 'bg-primary text-primary-foreground' : 'text-foreground'
              }`}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                color={isActivePath(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
              />
              <span className="font-medium">{item?.label}</span>
              {item?.badge && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                  {item?.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Voice Control */}
          <button
            onClick={handleVoiceToggle}
            className={`p-2 rounded-lg transition-smooth hover:bg-muted ${
              isVoiceActive ? 'bg-primary text-primary-foreground voice-pulse' : 'text-muted-foreground'
            }`}
            title="Voice commands"
          >
            <Icon name="Mic" size={18} />
          </button>

          {/* Search */}
          <button
            className="p-2 rounded-lg transition-smooth hover:bg-muted text-muted-foreground"
            title="Search products"
          >
            <Icon name="Search" size={18} />
          </button>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg transition-smooth hover:bg-muted"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-secondary-foreground)" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-warm-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-popover-foreground">
                      {userType === 'artisan' ? 'Artisan Account' : 'Buyer Account'}
                    </p>
                    <p className="text-xs text-muted-foreground">user@example.com</p>
                  </div>
                  {userMenuItems?.filter(item => item?.visible)?.map((item, index) => (
                    <button
                      key={index}
                      onClick={item?.action || (() => handleNavigation(item?.path))}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/buyer-login')}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/artisan-registration')}
              >
                Join as Artisan
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-smooth hover:bg-muted text-foreground"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.filter(item => item?.visible)?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                  isActivePath(item?.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActivePath(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
                />
                <span className="font-medium">{item?.label}</span>
                {item?.badge && (
                  <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-data">
                    {item?.badge}
                  </span>
                )}
              </button>
            ))}
            
            {!isAuthenticated && (
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleNavigation('/buyer-login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleNavigation('/artisan-registration')}
                >
                  Join as Artisan
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
      {/* Click outside handler for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;