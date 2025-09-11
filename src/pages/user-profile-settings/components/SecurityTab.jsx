import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityTab = ({ securitySettings, onUpdateSecurity }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securitySettings?.twoFactorEnabled || false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handlePasswordInputChange = (e) => {
    const { name, value } = e?.target;
    setPasswordForm(prev => ({
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

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordForm?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordForm?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(passwordForm?.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwordForm?.currentPassword === passwordForm?.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordChange = () => {
    if (validatePasswordForm()) {
      // Simulate password change
      onUpdateSecurity({
        ...securitySettings,
        lastPasswordChange: new Date()?.toISOString()
      });
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
      
      // Show success message (you might want to add a toast notification here)
      alert('Password changed successfully!');
    }
  };

  const handleTwoFactorToggle = (enabled) => {
    setTwoFactorEnabled(enabled);
    onUpdateSecurity({
      ...securitySettings,
      twoFactorEnabled: enabled
    });
    
    if (enabled) {
      // In a real app, this would show QR code setup
      alert('Two-factor authentication setup would be initiated here. Please scan the QR code with your authenticator app.');
    }
  };

  const handleAccountDeletion = () => {
    if (deleteConfirmText === 'DELETE MY ACCOUNT') {
      // In a real app, this would call an API to delete the account
      alert('Account deletion request submitted. You will receive a confirmation email within 24 hours.');
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    }
  };

  const lastPasswordChange = securitySettings?.lastPasswordChange 
    ? new Date(securitySettings.lastPasswordChange)?.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : 'Never';

  return (
    <div className="space-y-8">
      {/* Password Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Password</h3>
            <p className="text-sm text-muted-foreground">
              Last changed: {lastPasswordChange}
            </p>
          </div>
          {!isChangingPassword && (
            <Button
              variant="outline"
              onClick={() => setIsChangingPassword(true)}
              iconName="Key"
              iconPosition="left"
            >
              Change Password
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
            <div className="relative">
              <Input
                label="Current Password"
                name="currentPassword"
                type={showPasswords?.current ? "text" : "password"}
                value={passwordForm?.currentPassword}
                onChange={handlePasswordInputChange}
                error={errors?.currentPassword}
                placeholder="Enter your current password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.current ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="relative">
              <Input
                label="New Password"
                name="newPassword"
                type={showPasswords?.new ? "text" : "password"}
                value={passwordForm?.newPassword}
                onChange={handlePasswordInputChange}
                error={errors?.newPassword}
                placeholder="Enter your new password"
                required
                description="Must be at least 8 characters with uppercase, lowercase, and number"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.new ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type={showPasswords?.confirm ? "text" : "password"}
                value={passwordForm?.confirmPassword}
                onChange={handlePasswordInputChange}
                error={errors?.confirmPassword}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.confirm ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="default"
                onClick={handlePasswordChange}
                iconName="Save"
                iconPosition="left"
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setErrors({});
                }}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Two-Factor Authentication
        </h3>
        
        <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">Authenticator App</h4>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <Checkbox
                  checked={twoFactorEnabled}
                  onChange={(e) => handleTwoFactorToggle(e?.target?.checked)}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Add an extra layer of security to your account by requiring a verification code from your authenticator app when signing in.
            </p>
            {twoFactorEnabled && (
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="CheckCircle" size={16} />
                <span>Two-factor authentication is active</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Login Sessions */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
          Active Sessions
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Monitor" size={20} className="text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Current Session</p>
                <p className="text-sm text-muted-foreground">
                  Chrome on Windows • Mumbai, India • Active now
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-success">Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-muted/10 rounded-lg flex items-center justify-center">
                <Icon name="Smartphone" size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Mobile App</p>
                <p className="text-sm text-muted-foreground">
                  Android App • Last active 2 hours ago
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Danger Zone */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-error border-b border-error/20 pb-2">
          Danger Zone
        </h3>
        
        <div className="p-6 bg-error/5 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-2">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              
              {!showDeleteConfirm ? (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete Account
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-background border border-border rounded-lg">
                    <p className="text-sm text-foreground mb-3">
                      This will permanently delete your account and all data. Type{' '}
                      <span className="font-data font-semibold">DELETE MY ACCOUNT</span> to confirm:
                    </p>
                    <Input
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e?.target?.value)}
                      placeholder="Type DELETE MY ACCOUNT"
                      className="mb-3"
                    />
                    <div className="flex gap-3">
                      <Button
                        variant="destructive"
                        onClick={handleAccountDeletion}
                        disabled={deleteConfirmText !== 'DELETE MY ACCOUNT'}
                        iconName="Trash2"
                        iconPosition="left"
                      >
                        Confirm Deletion
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeleteConfirmText('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;