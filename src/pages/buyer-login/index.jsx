import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import LanguageSelector from './components/LanguageSelector';
import VoiceControl from './components/VoiceControl';
import Icon from '../../components/AppIcon';

const BuyerLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      const redirectTo = location?.state?.from || '/product-details';
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      const mockToken = 'buyer_token_' + Date.now();
      const mockUser = {
        id: 'buyer_001',
        email: formData?.email,
        name: 'John Doe',
        type: 'buyer',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userType', 'buyer');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      if (formData?.rememberMe) {
        localStorage.setItem('rememberLogin', 'true');
      }
      
      // Redirect to intended page or dashboard
      const redirectTo = location?.state?.from || '/product-details';
      navigate(redirectTo, { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (provider === 'guest') {
        // Guest checkout
        localStorage.setItem('guestMode', 'true');
        navigate('/shopping-cart');
      } else {
        // Mock social login success
        const mockToken = `${provider}_token_` + Date.now();
        const mockUser = {
          id: `${provider}_001`,
          email: `user@${provider}.com`,
          name: 'Social User',
          type: 'buyer',
          provider: provider,
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        };
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userType', 'buyer');
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        const redirectTo = location?.state?.from || '/product-details';
        navigate(redirectTo, { replace: true });
      }
      
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    // In a real app, this would trigger UI translation
    console.log('Language changed to:', languageCode);
  };

  const handleVoiceCommand = (command) => {
    switch (command) {
      case 'submit_form':
        // Trigger form submission
        document.querySelector('form')?.requestSubmit();
        break;
      case 'toggle_password':
        // Toggle password visibility
        document.querySelector('[title*="password"]')?.click();
        break;
      case 'toggle_remember':
        // Toggle remember me checkbox
        document.querySelector('input[name="rememberMe"]')?.click();
        break;
      case 'forgot_password':
        navigate('/forgot-password');
        break;
      case 'navigate_register': navigate('/artisan-registration');
        break;
      case 'guest_login': handleSocialLogin('guest');
        break;
      case 'show_help':
        // Show help modal or navigate to help
        navigate('/help');
        break;
      default:
        console.log('Unknown voice command:', command);
    }
  };

  const getPageTitle = () => {
    const titles = {
      'en': 'Sign In - ArtisanCraft Marketplace',
      'hi': 'साइन इन - आर्टिज़न क्राफ्ट मार्केटप्लेस',
      'bn': 'সাইন ইন - আর্টিজান ক্রাফট মার্কেটপ্লেস',
      'ta': 'உள்நுழைவு - ஆர்டிசன் கிராஃப்ட் சந்தை',
      'te': 'సైన్ ఇన్ - ఆర్టిసన్ క్రాఫ్ట్ మార్కెట్‌ప్లేస్',
      'mr': 'साइन इन - आर्टिसन क्राफ्ट मार्केटप्लेस',
      'gu': 'સાઇન ઇન - આર્ટિસન ક્રાફ્ટ માર્કેટપ્લેસ',
      'kn': 'ಸೈನ್ ಇನ್ - ಆರ್ಟಿಸನ್ ಕ್ರಾಫ್ಟ್ ಮಾರ್ಕೆಟ್‌ಪ್ಲೇಸ್'
    };
    return titles?.[currentLanguage] || titles?.['en'];
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Sign in to ArtisanCraft Marketplace to discover and purchase authentic handcrafted products from talented artisans worldwide." />
        <meta name="keywords" content="artisan login, craft marketplace, handmade products, buyer account" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Main Content */}
        <main className="pt-16 min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Branding & Info */}
              <div className="hidden lg:block">
                <div className="max-w-lg">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                      <Icon name="Palette" size={40} color="var(--color-primary)" />
                    </div>
                    <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                      Discover Authentic Crafts
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Join thousands of craft enthusiasts who trust ArtisanCraft Marketplace for unique, handmade treasures from talented artisans around the world.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name="Shield" size={16} color="var(--color-success)" />
                      </div>
                      <span className="text-foreground font-medium">Secure & trusted payments</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Truck" size={16} color="var(--color-primary)" />
                      </div>
                      <span className="text-foreground font-medium">Fast & reliable shipping</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Heart" size={16} color="var(--color-accent)" />
                      </div>
                      <span className="text-foreground font-medium">Support local artisans</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Forms */}
              <div className="w-full">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-warm-lg">
                  
                  {/* Language Selector */}
                  <div className="flex justify-end mb-6">
                    <LanguageSelector onLanguageChange={handleLanguageChange} />
                  </div>

                  {/* Login Form */}
                  <LoginForm 
                    onSubmit={handleLogin} 
                    isLoading={isLoading} 
                  />

                  {/* Divider */}
                  <div className="my-8">
                    <SocialLogin 
                      onSocialLogin={handleSocialLogin} 
                      isLoading={isLoading} 
                    />
                  </div>

                  {/* Additional Links */}
                  <div className="text-center pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      New to ArtisanCraft Marketplace?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => navigate('/buyer-registration')}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-micro text-sm font-medium"
                      >
                        <Icon name="UserPlus" size={16} />
                        <span>Create Buyer Account</span>
                      </button>
                      <button
                        onClick={() => navigate('/artisan-registration')}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-micro text-sm font-medium"
                      >
                        <Icon name="Brush" size={16} />
                        <span>Become an Artisan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Voice Control */}
        <VoiceControl onVoiceCommand={handleVoiceCommand} />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card border border-border rounded-lg p-6 shadow-warm-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                <span className="text-foreground font-medium">Signing you in...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuyerLogin;