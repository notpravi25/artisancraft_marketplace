import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  onApplyPromoCode, 
  onProceedToCheckout, 
  isCheckoutLoading,
  appliedPromoCode,
  promoDiscount 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  // Calculate charges
  const taxRate = 0.18; // 18% GST
  const taxAmount = subtotal * taxRate;
  const shippingCharges = subtotal > 2000 ? 0 : 150; // Free shipping above ₹2000
  const discountAmount = appliedPromoCode ? promoDiscount : 0;
  const totalAmount = subtotal + taxAmount + shippingCharges - discountAmount;

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock promo code validation
    const validPromoCodes = {
      'CRAFT10': { discount: subtotal * 0.1, message: '10% discount applied!' },
      'WELCOME20': { discount: subtotal * 0.2, message: '20% welcome discount applied!' },
      'ARTISAN15': { discount: subtotal * 0.15, message: '15% artisan special discount applied!' }
    };

    if (validPromoCodes?.[promoCode?.toUpperCase()]) {
      const promo = validPromoCodes?.[promoCode?.toUpperCase()];
      setPromoSuccess(promo?.message);
      onApplyPromoCode(promoCode?.toUpperCase(), promo?.discount);
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Please try again.');
    }

    setIsApplyingPromo(false);
  };

  const handleRemovePromoCode = () => {
    onApplyPromoCode('', 0);
    setPromoSuccess('');
    setPromoError('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
      <h2 className="text-xl font-heading font-semibold text-card-foreground mb-6">
        Order Summary
      </h2>
      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-data text-card-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">GST (18%)</span>
            <Icon name="Info" size={14} className="text-muted-foreground" />
          </div>
          <span className="font-data text-card-foreground">
            {formatPrice(taxAmount)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Shipping</span>
            {shippingCharges === 0 && (
              <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                FREE
              </span>
            )}
          </div>
          <span className="font-data text-card-foreground">
            {shippingCharges === 0 ? 'Free' : formatPrice(shippingCharges)}
          </span>
        </div>

        {appliedPromoCode && (
          <div className="flex justify-between items-center text-success">
            <div className="flex items-center space-x-2">
              <span>Discount ({appliedPromoCode})</span>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleRemovePromoCode}
                className="text-muted-foreground hover:text-destructive p-1"
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
            <span className="font-data">
              -{formatPrice(discountAmount)}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-heading font-semibold text-card-foreground">
              Total
            </span>
            <span className="text-xl font-heading font-bold text-primary">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>
      </div>
      {/* Promo Code Section */}
      {!appliedPromoCode && (
        <div className="mb-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
              error={promoError}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleApplyPromoCode}
              disabled={isApplyingPromo}
              loading={isApplyingPromo}
              className="px-4"
            >
              Apply
            </Button>
          </div>
          {promoSuccess && (
            <div className="flex items-center space-x-2 mt-2 text-success text-sm">
              <Icon name="CheckCircle" size={16} />
              <span>{promoSuccess}</span>
            </div>
          )}
        </div>
      )}
      {/* Estimated Delivery */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Truck" size={16} className="text-primary" />
          <span className="font-medium text-card-foreground">
            Estimated Delivery
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          5-7 business days
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Delivery time may vary based on artisan location
        </p>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        loading={isCheckoutLoading}
        iconName="ArrowRight"
        iconPosition="right"
        className="mb-4"
      >
        Proceed to Checkout
      </Button>
      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>Secure checkout with 256-bit SSL encryption</span>
      </div>
    </div>
  );
};

export default OrderSummary;