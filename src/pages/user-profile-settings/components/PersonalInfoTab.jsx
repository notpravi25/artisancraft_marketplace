import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PersonalInfoTab = ({ userType, profileData, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    email: profileData?.email || '',
    phone: profileData?.phone || '',
    address: profileData?.address || '',
    city: profileData?.city || '',
    state: profileData?.state || '',
    pincode: profileData?.pincode || '',
    profilePhoto: profileData?.profilePhoto || '',
    craftSpecialization: profileData?.craftSpecialization || '',
    workshopLocation: profileData?.workshopLocation || '',
    artisanStory: profileData?.artisanStory || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(profileData?.profilePhoto || '');
  const [errors, setErrors] = useState({});

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

  const craftSpecializations = [
    { value: 'pottery', label: 'Pottery & Ceramics' },
    { value: 'textiles', label: 'Textiles & Weaving' },
    { value: 'woodwork', label: 'Woodwork & Carving' },
    { value: 'metalwork', label: 'Metalwork & Jewelry' },
    { value: 'painting', label: 'Traditional Painting' },
    { value: 'sculpture', label: 'Sculpture & Stone Carving' },
    { value: 'leather', label: 'Leather Crafts' },
    { value: 'bamboo', label: 'Bamboo & Cane Work' },
    { value: 'embroidery', label: 'Embroidery & Needlework' },
    { value: 'glasswork', label: 'Glasswork & Beadwork' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File size should be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e?.target?.result;
        setPhotoPreview(photoUrl);
        setFormData(prev => ({
          ...prev,
          profilePhoto: photoUrl
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData?.pincode?.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!/^\d{6}$/?.test(formData?.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    if (userType === 'artisan' && !formData?.craftSpecialization) {
      newErrors.craftSpecialization = 'Please select your craft specialization';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: profileData?.firstName || '',
      lastName: profileData?.lastName || '',
      email: profileData?.email || '',
      phone: profileData?.phone || '',
      address: profileData?.address || '',
      city: profileData?.city || '',
      state: profileData?.state || '',
      pincode: profileData?.pincode || '',
      profilePhoto: profileData?.profilePhoto || '',
      craftSpecialization: profileData?.craftSpecialization || '',
      workshopLocation: profileData?.workshopLocation || '',
      artisanStory: profileData?.artisanStory || ''
    });
    setPhotoPreview(profileData?.profilePhoto || '');
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="User" size={32} className="text-muted-foreground" />
              </div>
            )}
          </div>
          {isEditing && (
            <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} className="text-primary-foreground" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">Profile Photo</h3>
          <p className="text-sm text-muted-foreground">
            Upload a clear photo of yourself. Maximum file size: 5MB
          </p>
          {errors?.profilePhoto && (
            <p className="text-sm text-error mt-1">{errors?.profilePhoto}</p>
          )}
        </div>
      </div>
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          name="firstName"
          value={formData?.firstName}
          onChange={handleInputChange}
          disabled={!isEditing}
          required
          error={errors?.firstName}
          placeholder="Enter your first name"
        />

        <Input
          label="Last Name"
          name="lastName"
          value={formData?.lastName}
          onChange={handleInputChange}
          disabled={!isEditing}
          required
          error={errors?.lastName}
          placeholder="Enter your last name"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData?.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          required
          error={errors?.email}
          placeholder="Enter your email address"
        />

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData?.phone}
          onChange={handleInputChange}
          disabled={!isEditing}
          required
          error={errors?.phone}
          placeholder="Enter 10-digit mobile number"
        />
      </div>
      {/* Address Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Address Information
        </h3>
        
        <div className="grid grid-cols-1 gap-6">
          <Input
            label="Address"
            name="address"
            value={formData?.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Enter your complete address"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="City"
              name="city"
              value={formData?.city}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your city"
            />

            <Select
              label="State"
              options={indianStates}
              value={formData?.state}
              onChange={(value) => handleSelectChange('state', value)}
              disabled={!isEditing}
              placeholder="Select your state"
              searchable
            />

            <Input
              label="PIN Code"
              name="pincode"
              value={formData?.pincode}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              error={errors?.pincode}
              placeholder="Enter 6-digit PIN code"
              maxLength={6}
            />
          </div>
        </div>
      </div>
      {/* Artisan-specific Information */}
      {userType === 'artisan' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Artisan Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Craft Specialization"
              options={craftSpecializations}
              value={formData?.craftSpecialization}
              onChange={(value) => handleSelectChange('craftSpecialization', value)}
              disabled={!isEditing}
              required
              error={errors?.craftSpecialization}
              placeholder="Select your craft specialization"
              searchable
            />

            <Input
              label="Workshop Location"
              name="workshopLocation"
              value={formData?.workshopLocation}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your workshop location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Artisan Story
            </label>
            <textarea
              name="artisanStory"
              value={formData?.artisanStory}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              placeholder="Tell your story as an artisan - your journey, inspiration, and what makes your craft unique..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Share your journey and what makes your craft special (optional)
            </p>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
        {!isEditing ? (
          <Button
            variant="default"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoTab;