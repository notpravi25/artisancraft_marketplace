import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import VoiceControlIndicator from './components/VoiceControlIndicator';

const ArtisanRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'english';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save language preference
      localStorage.setItem('preferredLanguage', formData?.languagePreference);
      setCurrentLanguage(formData?.languagePreference);
      
      // Store user data and show success
      setUserData(formData);
      setRegistrationComplete(true);
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = (active) => {
    setIsVoiceActive(active);
  };

  return (
    <>
      <Helmet>
        <title>Join as Artisan - ArtisanCraft Marketplace</title>
        <meta 
          name="description" 
          content="Create your artisan account and start selling handcrafted products with AI-powered descriptions. Join thousands of artisans on ArtisanCraft Marketplace." 
        />
        <meta name="keywords" content="artisan registration, handmade crafts, marketplace, AI descriptions, craft selling" />
        <meta property="og:title" content="Join as Artisan - ArtisanCraft Marketplace" />
        <meta property="og:description" content="Start your digital craft business journey with AI-powered product descriptions" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="max-w-4xl mx-auto">
              {!registrationComplete ? (
                <>
                  <RegistrationHeader />
                  
                  <div className="bg-card border border-border rounded-xl shadow-warm-lg p-6 lg:p-8">
                    <RegistrationForm 
                      onSubmit={handleRegistrationSubmit}
                      isLoading={isLoading}
                    />
                  </div>
                </>
              ) : (
                <div className="bg-card border border-border rounded-xl shadow-warm-lg p-6 lg:p-8">
                  <RegistrationSuccess userData={userData} />
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Voice Control Indicator */}
        <VoiceControlIndicator 
          isActive={isVoiceActive}
          onToggle={handleVoiceToggle}
        />

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <button className="hover:text-foreground transition-micro">
                  Privacy Policy
                </button>
                <button className="hover:text-foreground transition-micro">
                  Terms of Service
                </button>
                <button className="hover:text-foreground transition-micro">
                  Help Center
                </button>
                <button className="hover:text-foreground transition-micro">
                  Contact Support
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <span>Secure Registration</span>
                <span>•</span>
                <span>SSL Encrypted</span>
                <span>•</span>
                <span>GDPR Compliant</span>
              </div>
              
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} ArtisanCraft Marketplace. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ArtisanRegistration;