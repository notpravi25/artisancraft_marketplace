import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PreferencesTab = ({ preferences, onUpdatePreferences }) => {
  const [formData, setFormData] = useState({
    language: preferences?.language || 'english',
    currency: preferences?.currency || 'inr',
    theme: preferences?.theme || 'dark',
    emailNotifications: preferences?.emailNotifications || {
      orders: true,
      messages: true,
      promotions: false,
      newsletter: false
    },
    smsNotifications: preferences?.smsNotifications || {
      orders: true,
      messages: false,
      promotions: false
    },
    voiceControl: preferences?.voiceControl || false,
    autoTranslate: preferences?.autoTranslate || false
  });

  const [hasChanges, setHasChanges] = useState(false);

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'urdu', label: 'اردو (Urdu)' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)' }
  ];

  const currencyOptions = [
    { value: 'inr', label: '₹ Indian Rupee (INR)' },
    { value: 'usd', label: '$ US Dollar (USD)' },
    { value: 'eur', label: '€ Euro (EUR)' },
    { value: 'gbp', label: '£ British Pound (GBP)' }
  ];

  const themeOptions = [
    { value: 'dark', label: 'Dark Theme (Default)' },
    { value: 'light', label: 'Light Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  useEffect(() => {
    const originalData = JSON.stringify(preferences);
    const currentData = JSON.stringify(formData);
    setHasChanges(originalData !== currentData);
  }, [formData, preferences]);

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, field, checked) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev?.[type],
        [field]: checked
      }
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSave = () => {
    onUpdatePreferences(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData({
      language: preferences?.language || 'english',
      currency: preferences?.currency || 'inr',
      theme: preferences?.theme || 'dark',
      emailNotifications: preferences?.emailNotifications || {
        orders: true,
        messages: true,
        promotions: false,
        newsletter: false
      },
      smsNotifications: preferences?.smsNotifications || {
        orders: true,
        messages: false,
        promotions: false
      },
      voiceControl: preferences?.voiceControl || false,
      autoTranslate: preferences?.autoTranslate || false
    });
  };

  return (
    <div className="space-y-8">
      {/* Language & Localization */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Language & Localization
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Display Language"
            description="Choose your preferred language for the interface"
            options={languageOptions}
            value={formData?.language}
            onChange={(value) => handleSelectChange('language', value)}
            searchable
          />

          <Select
            label="Currency Display"
            description="Select currency for price display"
            options={currencyOptions}
            value={formData?.currency}
            onChange={(value) => handleSelectChange('currency', value)}
          />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Auto-translate product descriptions"
            description="Automatically translate product descriptions to your selected language"
            checked={formData?.autoTranslate}
            onChange={(e) => handleCheckboxChange('autoTranslate', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Appearance */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Appearance
        </h3>
        
        <Select
          label="Theme"
          description="Choose your preferred color theme"
          options={themeOptions}
          value={formData?.theme}
          onChange={(value) => handleSelectChange('theme', value)}
        />
      </div>
      {/* Accessibility */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Accessibility
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Voice Control"
            description="Use voice commands to navigate and interact with the marketplace"
            checked={formData?.voiceControl}
            onChange={(e) => handleCheckboxChange('voiceControl', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Email Notifications */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Email Notifications
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Order Updates"
            description="Receive emails about order status, shipping, and delivery"
            checked={formData?.emailNotifications?.orders}
            onChange={(e) => handleNotificationChange('emailNotifications', 'orders', e?.target?.checked)}
          />
          
          <Checkbox
            label="Messages"
            description="Get notified when you receive messages from buyers or artisans"
            checked={formData?.emailNotifications?.messages}
            onChange={(e) => handleNotificationChange('emailNotifications', 'messages', e?.target?.checked)}
          />
          
          <Checkbox
            label="Promotional Offers"
            description="Receive emails about special offers, discounts, and sales"
            checked={formData?.emailNotifications?.promotions}
            onChange={(e) => handleNotificationChange('emailNotifications', 'promotions', e?.target?.checked)}
          />
          
          <Checkbox
            label="Newsletter"
            description="Stay updated with marketplace news, featured artisans, and craft stories"
            checked={formData?.emailNotifications?.newsletter}
            onChange={(e) => handleNotificationChange('emailNotifications', 'newsletter', e?.target?.checked)}
          />
        </div>
      </div>
      {/* SMS Notifications */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          SMS Notifications
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Order Updates"
            description="Receive SMS for critical order updates and delivery notifications"
            checked={formData?.smsNotifications?.orders}
            onChange={(e) => handleNotificationChange('smsNotifications', 'orders', e?.target?.checked)}
          />
          
          <Checkbox
            label="Important Messages"
            description="Get SMS for urgent messages and account security alerts"
            checked={formData?.smsNotifications?.messages}
            onChange={(e) => handleNotificationChange('smsNotifications', 'messages', e?.target?.checked)}
          />
          
          <Checkbox
            label="Flash Sales"
            description="Receive SMS alerts for limited-time offers and flash sales"
            checked={formData?.smsNotifications?.promotions}
            onChange={(e) => handleNotificationChange('smsNotifications', 'promotions', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Action Buttons */}
      {hasChanges && (
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Save Preferences
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset Changes
          </Button>
        </div>
      )}
      {!hasChanges && (
        <div className="flex items-center space-x-2 pt-6 border-t border-border">
          <Icon name="Check" size={16} className="text-success" />
          <span className="text-sm text-success">All preferences saved</span>
        </div>
      )}
    </div>
  );
};

export default PreferencesTab;