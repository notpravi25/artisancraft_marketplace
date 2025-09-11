import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userData }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Set authentication token and user data
    localStorage.setItem('authToken', 'artisan_' + Date.now());
    localStorage.setItem('userType', 'artisan');
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Navigate to product upload wizard
    navigate('/product-upload-wizard');
  };

  return (
    <div className="text-center space-y-8 max-w-2xl mx-auto">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={32} color="var(--color-success-foreground)" />
          </div>
        </div>
      </div>
      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-heading font-bold text-foreground">
          Welcome to ArtisanCraft! 🎉
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Your artisan account has been successfully created. You're now ready to showcase your beautiful 
          handcrafted products to customers worldwide.
        </p>
      </div>
      {/* Account Details */}
      <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-card-foreground">
            Account Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium text-card-foreground">{userData?.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium text-card-foreground">{userData?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Craft Specialization</p>
            <p className="font-medium text-card-foreground">
              {userData?.craftSpecialization?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium text-card-foreground">
              {userData?.city}, {userData?.state?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
            </p>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-left">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            What's Next?
          </h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary-foreground">1</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Upload Your First Product</p>
              <p className="text-sm text-muted-foreground">
                Simply upload photos and set your price - our AI will create compelling descriptions
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-muted-foreground">2</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Build Your Profile</p>
              <p className="text-sm text-muted-foreground">
                Add your story and showcase your craftsmanship journey
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-muted-foreground">3</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Start Selling</p>
              <p className="text-sm text-muted-foreground">
                Connect with customers and grow your craft business
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
        <Button
          variant="default"
          size="lg"
          onClick={handleContinue}
          iconName="Upload"
          iconPosition="left"
        >
          Upload Your First Product
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/user-profile-settings')}
          iconName="Settings"
          iconPosition="left"
        >
          Complete Profile Later
        </Button>
      </div>
      {/* Support Information */}
      <div className="text-center pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">
          Need help getting started?
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-micro">
            <Icon name="HelpCircle" size={16} />
            <span className="text-sm">Help Center</span>
          </button>
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-micro">
            <Icon name="MessageCircle" size={16} />
            <span className="text-sm">Live Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;