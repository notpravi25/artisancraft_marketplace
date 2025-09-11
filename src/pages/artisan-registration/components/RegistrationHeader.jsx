import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 mb-8">
      {/* Logo and Brand */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-warm">
            <Icon name="Palette" size={28} color="var(--color-primary-foreground)" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-heading font-bold text-foreground">
              ArtisanCraft
            </h1>
            <p className="text-sm font-caption text-muted-foreground -mt-1">
              Marketplace
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-3">
        <h2 className="text-3xl font-heading font-bold text-foreground">
          Join Our Artisan Community
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Start your digital marketplace journey. Create beautiful product listings with just photos and prices - 
          our AI will craft compelling descriptions for your handmade treasures.
        </p>
      </div>

      {/* Benefits Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
        <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-card-foreground">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">Auto-generated descriptions</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Globe" size={20} className="text-success" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-card-foreground">Global Reach</h3>
            <p className="text-sm text-muted-foreground">Multi-language support</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Smartphone" size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-card-foreground">Easy Setup</h3>
            <p className="text-sm text-muted-foreground">Just upload & price</p>
          </div>
        </div>
      </div>

      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/buyer-login')}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Login
        </Button>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>Secure & Trusted Platform</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;