import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const PriceInput = ({ price, onPriceChange, error }) => {
  const [displayPrice, setDisplayPrice] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    if (price) {
      setDisplayPrice(formatIndianCurrency(price));
      setPriceRange(getPriceRange(price));
    }
  }, [price]);

  const formatIndianCurrency = (amount) => {
    if (!amount) return '';
    const numStr = amount?.toString();
    const lastThree = numStr?.substring(numStr?.length - 3);
    const otherNumbers = numStr?.substring(0, numStr?.length - 3);
    if (otherNumbers !== '') {
      return otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    }
    return lastThree;
  };

  const parseIndianCurrency = (value) => {
    return value?.replace(/,/g, '');
  };

  const getPriceRange = (amount) => {
    const num = parseInt(amount);
    if (num < 500) return 'Budget-friendly';
    if (num < 2000) return 'Affordable';
    if (num < 10000) return 'Premium';
    if (num < 50000) return 'Luxury';
    return 'High-end';
  };

  const handlePriceChange = (e) => {
    const value = e?.target?.value?.replace(/[^\d]/g, '');
    if (value === '') {
      setDisplayPrice('');
      onPriceChange('');
      setPriceRange('');
      return;
    }

    const numericValue = parseInt(value);
    if (numericValue <= 10000000) { // 1 crore limit
      setDisplayPrice(formatIndianCurrency(value));
      onPriceChange(value);
      setPriceRange(getPriceRange(value));
    }
  };

  const suggestedPrices = [
    { range: '₹500 - ₹1,000', category: 'Small crafts, accessories' },
    { range: '₹1,000 - ₹5,000', category: 'Medium crafts, home decor' },
    { range: '₹5,000 - ₹20,000', category: 'Large crafts, furniture' },
    { range: '₹20,000+', category: 'Premium, collectible items' }
  ];

  const quickPriceOptions = [500, 1000, 2500, 5000, 10000];

  const handleQuickPrice = (amount) => {
    const value = amount?.toString();
    setDisplayPrice(formatIndianCurrency(value));
    onPriceChange(value);
    setPriceRange(getPriceRange(value));
  };

  return (
    <div className="space-y-6">
      {/* Main Price Input */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-muted-foreground">
            <Icon name="IndianRupee" size={18} />
          </div>
          
          <Input
            type="text"
            label="Product Price"
            placeholder="Enter price in rupees"
            value={displayPrice}
            onChange={handlePriceChange}
            error={error}
            className="pl-12 text-lg font-data"
            description="Set a competitive price for your handcrafted product"
          />
        </div>

        {/* Price Range Indicator */}
        {priceRange && (
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Price Category: {priceRange}
              </span>
            </div>
            {price && (
              <div className="text-sm text-muted-foreground">
                ₹{formatIndianCurrency(price)}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Quick Price Options */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Quick Price Options</h4>
        <div className="grid grid-cols-5 gap-2">
          {quickPriceOptions?.map((amount) => (
            <button
              key={amount}
              onClick={() => handleQuickPrice(amount)}
              className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                price === amount?.toString()
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary hover:bg-muted text-foreground'
              }`}
            >
              ₹{formatIndianCurrency(amount?.toString())}
            </button>
          ))}
        </div>
      </div>
      {/* Pricing Guidelines */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Pricing Guidelines</h4>
        <div className="grid gap-3">
          {suggestedPrices?.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:shadow-warm-sm transition-all"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-card-foreground">
                  {suggestion?.range}
                </p>
                <p className="text-xs text-muted-foreground">
                  {suggestion?.category}
                </p>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
      {/* Pricing Tips */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">Pricing Tips</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Consider material costs, time invested, and skill level</li>
              <li>• Research similar products in the marketplace</li>
              <li>• Factor in platform fees and shipping costs</li>
              <li>• Start competitive and adjust based on demand</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Price Breakdown */}
      {price && parseInt(price) > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <h5 className="text-sm font-medium text-card-foreground">Price Breakdown</h5>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product Price</span>
              <span className="font-data text-card-foreground">₹{formatIndianCurrency(price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform Fee (5%)</span>
              <span className="font-data text-card-foreground">₹{formatIndianCurrency((parseInt(price) * 0.05)?.toFixed(0))}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-medium">
              <span className="text-card-foreground">You'll Receive</span>
              <span className="font-data text-success">₹{formatIndianCurrency((parseInt(price) * 0.95)?.toFixed(0))}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceInput;