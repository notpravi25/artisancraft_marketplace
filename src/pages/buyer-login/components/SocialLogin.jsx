import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  const handleSocialLogin = (provider) => {
    onSocialLogin(provider);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-caption">
            Or continue with
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialLogin(provider?.id)}
            disabled={isLoading}
            className="justify-center"
          >
            <div className="flex items-center space-x-3">
              <Icon name={provider?.icon} size={20} />
              <span>Continue with {provider?.name}</span>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Quick Guest Access
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Browse and shop without creating an account. You can register later during checkout.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSocialLogin('guest')}
              disabled={isLoading}
              className="text-primary hover:text-primary/80"
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;