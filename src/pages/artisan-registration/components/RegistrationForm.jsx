import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    craftSpecialization: '',
    languagePreference: '',
    state: '',
    city: '',
    pincode: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const craftOptions = [
    { value: 'pottery', label: 'Pottery & Ceramics' },
    { value: 'textiles', label: 'Textiles & Weaving' },
    { value: 'woodwork', label: 'Woodwork & Carving' },
    { value: 'jewelry', label: 'Jewelry & Metalwork' },
    { value: 'painting', label: 'Traditional Painting' },
    { value: 'sculpture', label: 'Sculpture & Stone Work' },
    { value: 'leather', label: 'Leather Craft' },
    { value: 'bamboo', label: 'Bamboo & Cane Work' },
    { value: 'embroidery', label: 'Embroidery & Needlework' },
    { value: 'glass', label: 'Glass Work & Beading' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिंदी (Hindi)' },
    { value: 'bengali', label: 'বাংলা (Bengali)' },
    { value: 'tamil', label: 'தமிழ் (Tamil)' },
    { value: 'telugu', label: 'తెలుగు (Telugu)' },
    { value: 'marathi', label: 'मराठी (Marathi)' },
    { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
    { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'malayalam', label: 'മലയാളം (Malayalam)' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  const indianStates = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'delhi', label: 'Delhi' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phoneNumber?.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData?.craftSpecialization) {
      newErrors.craftSpecialization = 'Please select your craft specialization';
    }

    if (!formData?.languagePreference) {
      newErrors.languagePreference = 'Please select your preferred language';
    }

    if (!formData?.state) {
      newErrors.state = 'Please select your state';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData?.pincode?.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/?.test(formData?.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    if (!formData?.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Personal Information
          </h3>
        </div>

        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          description="We'll use this for account verification and updates"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-micro"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>
        </div>

        <Input
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="10-digit mobile number"
          value={formData?.phoneNumber}
          onChange={handleInputChange}
          error={errors?.phoneNumber}
          description="We'll send order updates and verification codes"
          required
        />
      </div>
      {/* Craft Specialization Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Palette" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Craft Specialization
          </h3>
        </div>

        <Select
          label="Primary Craft Category"
          placeholder="Select your main craft specialization"
          options={craftOptions}
          value={formData?.craftSpecialization}
          onChange={(value) => handleSelectChange('craftSpecialization', value)}
          error={errors?.craftSpecialization}
          description="Choose the craft you specialize in most"
          searchable
          required
        />

        <Select
          label="Preferred Language"
          placeholder="Select your preferred language"
          options={languageOptions}
          value={formData?.languagePreference}
          onChange={(value) => handleSelectChange('languagePreference', value)}
          error={errors?.languagePreference}
          description="Language for app interface and communications"
          searchable
          required
        />
      </div>
      {/* Location Information Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Location Details
          </h3>
        </div>

        <Select
          label="State"
          placeholder="Select your state"
          options={indianStates}
          value={formData?.state}
          onChange={(value) => handleSelectChange('state', value)}
          error={errors?.state}
          searchable
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            name="city"
            placeholder="Enter your city"
            value={formData?.city}
            onChange={handleInputChange}
            error={errors?.city}
            required
          />

          <Input
            label="PIN Code"
            type="text"
            name="pincode"
            placeholder="6-digit PIN code"
            value={formData?.pincode}
            onChange={handleInputChange}
            error={errors?.pincode}
            maxLength="6"
            required
          />
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.termsAccepted}
          onChange={(e) => handleInputChange(e)}
          name="termsAccepted"
          error={errors?.termsAccepted}
          description="By creating an account, you agree to our terms and conditions"
          required
        />
      </div>
      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Artisan Account
        </Button>
      </div>
      {/* Login Redirect */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/buyer-login')}
            className="text-primary hover:text-primary/80 font-medium transition-micro"
          >
            Sign in here
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;