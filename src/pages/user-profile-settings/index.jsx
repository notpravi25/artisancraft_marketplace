import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PersonalInfoTab from './components/PersonalInfoTab';
import PreferencesTab from './components/PreferencesTab';
import SecurityTab from './components/SecurityTab';
import PaymentMethodsTab from './components/PaymentMethodsTab';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [userType, setUserType] = useState('buyer');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');

  // Mock user data
  const [profileData, setProfileData] = useState({
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '9876543210',
    address: '123, MG Road, Sector 15',
    city: 'Bangalore',
    state: 'karnataka',
    pincode: '560001',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    craftSpecialization: 'pottery',
    workshopLocation: 'Kumartuli, Kolkata',
    artisanStory: `I am a third-generation potter from Kumartuli, Kolkata. My family has been creating beautiful clay sculptures and pottery for over 60 years.\n\nI specialize in traditional Bengali terracotta work and Durga Puja idols. Each piece I create tells a story of our rich cultural heritage and the ancient art of clay molding that has been passed down through generations.`
  });

  const [preferences, setPreferences] = useState({
    language: 'english',
    currency: 'inr',
    theme: 'dark',
    emailNotifications: {
      orders: true,
      messages: true,
      promotions: false,
      newsletter: false
    },
    smsNotifications: {
      orders: true,
      messages: false,
      promotions: false
    },
    voiceControl: false,
    autoTranslate: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-08-15T10:30:00Z'
  });

  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'english';
    setCurrentLanguage(savedLanguage);
    
    // Check user type
    const savedUserType = localStorage.getItem('userType') || 'buyer';
    setUserType(savedUserType);

    // Set document title based on language
    const titles = {
      english: 'User Profile Settings - ArtisanCraft Marketplace',
      hindi: 'उपयोगकर्ता प्रोफ़ाइल सेटिंग्स - ArtisanCraft Marketplace',
      bengali: 'ব্যবহারকারী প্রোফাইল সেটিংস - ArtisanCraft Marketplace'
    };
    document.title = titles?.[currentLanguage] || titles?.english;
  }, [currentLanguage]);

  const tabs = [
    {
      id: 'personal',
      label: currentLanguage === 'hindi' ? 'व्यक्तिगत जानकारी' : 
             currentLanguage === 'bengali' ? 'ব্যক্তিগত তথ্য' : 'Personal Info',
      icon: 'User',
      description: currentLanguage === 'hindi' ? 'अपनी व्यक्तिगत जानकारी प्रबंधित करें' :
                   currentLanguage === 'bengali' ? 'আপনার ব্যক্তিগত তথ্য পরিচালনা করুন' : 'Manage your personal information'
    },
    {
      id: 'preferences',
      label: currentLanguage === 'hindi' ? 'प्राथमिकताएं' :
             currentLanguage === 'bengali' ? 'পছন্দসমূহ' : 'Preferences',
      icon: 'Settings',
      description: currentLanguage === 'hindi' ? 'भाषा और सूचना सेटिंग्स' :
                   currentLanguage === 'bengali' ? 'ভাষা এবং বিজ্ঞপ্তি সেটিংস' : 'Language and notification settings'
    },
    {
      id: 'security',
      label: currentLanguage === 'hindi' ? 'सुरक्षा' :
             currentLanguage === 'bengali' ? 'নিরাপত্তা' : 'Security',
      icon: 'Shield',
      description: currentLanguage === 'hindi' ? 'पासवर्ड और खाता सुरक्षा' :
                   currentLanguage === 'bengali' ? 'পাসওয়ার্ড এবং অ্যাকাউন্ট নিরাপত্তা' : 'Password and account security'
    },
    {
      id: 'payments',
      label: currentLanguage === 'hindi' ? 'भुगतान विधियां' :
             currentLanguage === 'bengali' ? 'পেমেন্ট পদ্ধতি' : 'Payment Methods',
      icon: 'CreditCard',
      description: currentLanguage === 'hindi' ? 'कार्ड और UPI प्रबंधन' :
                   currentLanguage === 'bengali' ? 'কার্ড এবং UPI ব্যবস্থাপনা' : 'Manage cards and UPI'
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleUpdateProfile = (updatedData) => {
    setProfileData(updatedData);
    // In a real app, this would make an API call
    console.log('Profile updated:', updatedData);
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setPreferences(updatedPreferences);
    
    // Update language in localStorage if changed
    if (updatedPreferences?.language !== currentLanguage) {
      localStorage.setItem('selectedLanguage', updatedPreferences?.language);
      setCurrentLanguage(updatedPreferences?.language);
    }
    
    // In a real app, this would make an API call
    console.log('Preferences updated:', updatedPreferences);
  };

  const handleUpdateSecurity = (updatedSecurity) => {
    setSecuritySettings(updatedSecurity);
    // In a real app, this would make an API call
    console.log('Security settings updated:', updatedSecurity);
  };

  const handleUpdatePaymentMethods = (updatedMethods) => {
    setPaymentMethods(updatedMethods);
    // In a real app, this would make an API call
    console.log('Payment methods updated:', updatedMethods);
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command?.toLowerCase();
    
    if (lowerCommand?.includes('personal') || lowerCommand?.includes('profile')) {
      setActiveTab('personal');
    } else if (lowerCommand?.includes('preferences') || lowerCommand?.includes('settings')) {
      setActiveTab('preferences');
    } else if (lowerCommand?.includes('security') || lowerCommand?.includes('password')) {
      setActiveTab('security');
    } else if (lowerCommand?.includes('payment') || lowerCommand?.includes('card')) {
      setActiveTab('payments');
    } else if (lowerCommand?.includes('change language')) {
      setActiveTab('preferences');
      // Focus on language section
    } else if (lowerCommand?.includes('go back') || lowerCommand?.includes('dashboard')) {
      navigate(userType === 'artisan' ? '/artisan-dashboard' : '/buyer-dashboard');
    }
  };

  const toggleVoiceControl = () => {
    setIsVoiceActive(!isVoiceActive);
    
    if (!isVoiceActive) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLanguage === 'hindi' ? 'hi-IN' : 
                          currentLanguage === 'bengali' ? 'bn-IN' : 'en-IN';
        
        recognition.onresult = (event) => {
          const command = event?.results?.[0]?.[0]?.transcript;
          handleVoiceCommand(command);
        };
        
        recognition.onerror = () => {
          setIsVoiceActive(false);
        };
        
        recognition.onend = () => {
          setIsVoiceActive(false);
        };
        
        recognition?.start();
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab
            userType={userType}
            profileData={profileData}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'preferences':
        return (
          <PreferencesTab
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      case 'security':
        return (
          <SecurityTab
            securitySettings={securitySettings}
            onUpdateSecurity={handleUpdateSecurity}
          />
        );
      case 'payments':
        return (
          <PaymentMethodsTab
            paymentMethods={paymentMethods}
            onUpdatePaymentMethods={handleUpdatePaymentMethods}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                {currentLanguage === 'hindi' ? 'वापस' :
                 currentLanguage === 'bengali' ? 'ফিরে যান' : 'Back'}
              </Button>
              <div>
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  {currentLanguage === 'hindi' ? 'प्रोफ़ाइल सेटिंग्स' :
                   currentLanguage === 'bengali' ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'hindi' ? 'अपनी खाता जानकारी और प्राथमिकताएं प्रबंधित करें' :
                   currentLanguage === 'bengali' ? 'আপনার অ্যাকাউন্টের তথ্য এবং পছন্দসমূহ পরিচালনা করুন' : 'Manage your account information and preferences'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={isVoiceActive ? "default" : "ghost"}
                size="sm"
                onClick={toggleVoiceControl}
                iconName="Mic"
                className={isVoiceActive ? "voice-pulse" : ""}
                title={currentLanguage === 'hindi' ? 'आवाज नियंत्रण' :
                       currentLanguage === 'bengali' ? 'ভয়েস কন্ট্রোল' : 'Voice control'}
              >
                {isVoiceActive && (
                  <span className="ml-2 text-xs">
                    {currentLanguage === 'hindi' ? 'सुन रहा है...' :
                     currentLanguage === 'bengali' ? 'শুনছে...' : 'Listening...'}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-8">
              <nav className="space-y-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => handleTabChange(tab?.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={tab?.icon} 
                      size={20} 
                      color={activeTab === tab?.id ? 'var(--color-primary-foreground)' : 'currentColor'} 
                    />
                    <div className="flex-1">
                      <div className="font-medium">{tab?.label}</div>
                      <div className={`text-xs ${
                        activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {tab?.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* User Type Badge */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    userType === 'artisan' ? 'bg-accent' : 'bg-primary'
                  }`}></div>
                  <span className="text-sm text-muted-foreground">
                    {userType === 'artisan' 
                      ? (currentLanguage === 'hindi' ? 'शिल्पकार खाता' :
                         currentLanguage === 'bengali' ? 'কারিগর অ্যাকাউন্ট' : 'Artisan Account')
                      : (currentLanguage === 'hindi' ? 'खरीदार खाता' :
                         currentLanguage === 'bengali' ? 'ক্রেতা অ্যাকাউন্ট' : 'Buyer Account')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-4">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => handleTabChange(tab?.id)}
              className={`flex flex-col items-center space-y-1 py-3 px-2 transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span className="text-xs font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;