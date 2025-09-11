import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PaymentMethodsTab = ({ paymentMethods, onUpdatePaymentMethods }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddUPI, setShowAddUPI] = useState(false);
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    nickname: ''
  });
  const [upiForm, setUpiForm] = useState({
    upiId: '',
    nickname: ''
  });
  const [errors, setErrors] = useState({});

  const mockPaymentMethods = paymentMethods || [
    {
      id: 1,
      type: 'card',
      nickname: 'Primary Card',
      cardNumber: '**** **** **** 4532',
      cardType: 'Visa',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'upi',
      nickname: 'Personal UPI',
      upiId: 'user@paytm',
      isDefault: false
    },
    {
      id: 3,
      type: 'wallet',
      nickname: 'Paytm Wallet',
      balance: '₹2,450',
      isDefault: false
    }
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const currentYear = new Date()?.getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(currentYear + i),
    label: String(currentYear + i)
  }));

  const handleCardInputChange = (e) => {
    const { name, value } = e?.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value?.replace(/\s/g, '')?.replace(/(.{4})/g, '$1 ')?.trim();
      if (formattedValue?.length > 19) return; // Limit to 16 digits + 3 spaces
    } else if (name === 'cvv') {
      // Limit CVV to 4 digits
      formattedValue = value?.replace(/\D/g, '')?.slice(0, 4);
    } else if (name === 'cardholderName') {
      // Only allow letters and spaces
      formattedValue = value?.replace(/[^a-zA-Z\s]/g, '');
    }

    setCardForm(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUpiInputChange = (e) => {
    const { name, value } = e?.target;
    setUpiForm(prev => ({
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

  const validateCardForm = () => {
    const newErrors = {};

    if (!cardForm?.cardNumber?.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardForm?.cardNumber?.replace(/\s/g, '')?.length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!cardForm?.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required';
    }

    if (!cardForm?.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required';
    }

    if (!cardForm?.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardForm?.cvv?.length < 3) {
      newErrors.cvv = 'CVV must be at least 3 digits';
    }

    if (!cardForm?.cardholderName?.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    if (!cardForm?.nickname?.trim()) {
      newErrors.nickname = 'Please provide a nickname for this card';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateUpiForm = () => {
    const newErrors = {};

    if (!upiForm?.upiId?.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!/^[\w.-]+@[\w.-]+$/?.test(upiForm?.upiId)) {
      newErrors.upiId = 'Please enter a valid UPI ID (e.g., user@paytm)';
    }

    if (!upiForm?.nickname?.trim()) {
      newErrors.nickname = 'Please provide a nickname for this UPI ID';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAddCard = () => {
    if (validateCardForm()) {
      const newCard = {
        id: Date.now(),
        type: 'card',
        nickname: cardForm?.nickname,
        cardNumber: `**** **** **** ${cardForm?.cardNumber?.slice(-4)}`,
        cardType: getCardType(cardForm?.cardNumber),
        expiryDate: `${cardForm?.expiryMonth}/${cardForm?.expiryYear?.slice(-2)}`,
        isDefault: false
      };

      onUpdatePaymentMethods([...mockPaymentMethods, newCard]);
      setCardForm({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardholderName: '',
        nickname: ''
      });
      setShowAddCard(false);
    }
  };

  const handleAddUPI = () => {
    if (validateUpiForm()) {
      const newUPI = {
        id: Date.now(),
        type: 'upi',
        nickname: upiForm?.nickname,
        upiId: upiForm?.upiId,
        isDefault: false
      };

      onUpdatePaymentMethods([...mockPaymentMethods, newUPI]);
      setUpiForm({
        upiId: '',
        nickname: ''
      });
      setShowAddUPI(false);
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber?.replace(/\s/g, '');
    if (number?.startsWith('4')) return 'Visa';
    if (number?.startsWith('5') || number?.startsWith('2')) return 'Mastercard';
    if (number?.startsWith('3')) return 'American Express';
    return 'Card';
  };

  const getPaymentIcon = (method) => {
    switch (method?.type) {
      case 'card':
        return method?.cardType === 'Visa' ? 'CreditCard' : 'CreditCard';
      case 'upi':
        return 'Smartphone';
      case 'wallet':
        return 'Wallet';
      default:
        return 'CreditCard';
    }
  };

  const handleSetDefault = (methodId) => {
    const updatedMethods = mockPaymentMethods?.map(method => ({
      ...method,
      isDefault: method?.id === methodId
    }));
    onUpdatePaymentMethods(updatedMethods);
  };

  const handleRemoveMethod = (methodId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      const updatedMethods = mockPaymentMethods?.filter(method => method?.id !== methodId);
      onUpdatePaymentMethods(updatedMethods);
    }
  };

  return (
    <div className="space-y-8">
      {/* Saved Payment Methods */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Saved Payment Methods</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddCard(true)}
              iconName="CreditCard"
              iconPosition="left"
            >
              Add Card
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddUPI(true)}
              iconName="Smartphone"
              iconPosition="left"
            >
              Add UPI
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {mockPaymentMethods?.map((method) => (
            <div
              key={method?.id}
              className={`p-6 bg-card border rounded-lg transition-smooth ${
                method?.isDefault ? 'border-primary' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getPaymentIcon(method)} size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{method?.nickname}</h4>
                      {method?.isDefault && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method?.type === 'card' && `${method?.cardNumber} • ${method?.cardType} • Expires ${method?.expiryDate}`}
                      {method?.type === 'upi' && method?.upiId}
                      {method?.type === 'wallet' && `Balance: ${method?.balance}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!method?.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(method?.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMethod(method?.id)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add Card Form */}
      {showAddCard && (
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-foreground">Add New Card</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddCard(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="Card Number"
              name="cardNumber"
              value={cardForm?.cardNumber}
              onChange={handleCardInputChange}
              error={errors?.cardNumber}
              placeholder="1234 5678 9012 3456"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Expiry Month"
                options={monthOptions}
                value={cardForm?.expiryMonth}
                onChange={(value) => setCardForm(prev => ({ ...prev, expiryMonth: value }))}
                error={errors?.expiryMonth}
                placeholder="MM"
                required
              />

              <Select
                label="Expiry Year"
                options={yearOptions}
                value={cardForm?.expiryYear}
                onChange={(value) => setCardForm(prev => ({ ...prev, expiryYear: value }))}
                error={errors?.expiryYear}
                placeholder="YYYY"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="CVV"
                name="cvv"
                type="password"
                value={cardForm?.cvv}
                onChange={handleCardInputChange}
                error={errors?.cvv}
                placeholder="123"
                required
              />

              <Input
                label="Cardholder Name"
                name="cardholderName"
                value={cardForm?.cardholderName}
                onChange={handleCardInputChange}
                error={errors?.cardholderName}
                placeholder="John Doe"
                required
              />
            </div>

            <Input
              label="Nickname"
              name="nickname"
              value={cardForm?.nickname}
              onChange={handleCardInputChange}
              error={errors?.nickname}
              placeholder="e.g., Primary Card, Work Card"
              description="Give this card a memorable name"
              required
            />

            <div className="flex gap-3 pt-4">
              <Button
                variant="default"
                onClick={handleAddCard}
                iconName="Plus"
                iconPosition="left"
              >
                Add Card
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddCard(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Add UPI Form */}
      {showAddUPI && (
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-foreground">Add UPI ID</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddUPI(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="UPI ID"
              name="upiId"
              value={upiForm?.upiId}
              onChange={handleUpiInputChange}
              error={errors?.upiId}
              placeholder="yourname@paytm"
              description="Enter your UPI ID (e.g., user@paytm, user@gpay)"
              required
            />

            <Input
              label="Nickname"
              name="nickname"
              value={upiForm?.nickname}
              onChange={handleUpiInputChange}
              error={errors?.nickname}
              placeholder="e.g., Personal UPI, Work UPI"
              description="Give this UPI ID a memorable name"
              required
            />

            <div className="flex gap-3 pt-4">
              <Button
                variant="default"
                onClick={handleAddUPI}
                iconName="Plus"
                iconPosition="left"
              >
                Add UPI ID
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddUPI(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Payment Security Info */}
      <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Secure Payment Processing</h4>
            <p className="text-sm text-muted-foreground">
              All payment information is encrypted and securely stored. We never store your complete card details or CVV. 
              Your financial information is protected with industry-standard security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsTab;