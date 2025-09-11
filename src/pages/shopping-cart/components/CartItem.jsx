import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onMoveToWishlist }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    onRemoveItem(item?.id);
  };

  const handleMoveToWishlist = () => {
    onMoveToWishlist(item?.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 transition-smooth hover:shadow-warm-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover hover-lift"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-card-foreground text-lg mb-1 line-clamp-2">
                {item?.name}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={12} color="var(--color-secondary-foreground)" />
                </div>
                <span className="text-sm text-muted-foreground font-caption">
                  by {item?.artisan}
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-sm text-muted-foreground">
                  Category: {item?.category}
                </span>
                <span className="text-sm text-success">
                  ✓ In Stock
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-xl font-heading font-semibold text-primary">
                {formatPrice(item?.price)}
              </div>
              <div className="text-sm text-muted-foreground">
                per item
              </div>
            </div>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-card-foreground">
                Quantity:
              </span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1 || isUpdating}
                  className="px-3 py-1 rounded-r-none border-r border-border"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <div className="px-4 py-1 min-w-[3rem] text-center font-data">
                  {isUpdating ? (
                    <Icon name="Loader2" size={16} className="animate-spin mx-auto" />
                  ) : (
                    item?.quantity
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={isUpdating}
                  className="px-3 py-1 rounded-l-none border-l border-border"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMoveToWishlist}
                className="text-muted-foreground hover:text-accent"
              >
                <Icon name="Heart" size={16} className="mr-1" />
                Save for Later
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-muted-foreground hover:text-destructive"
              >
                <Icon name="Trash2" size={16} className="mr-1" />
                Remove
              </Button>
            </div>
          </div>

          {/* Total Price for this item */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Subtotal ({item?.quantity} {item?.quantity === 1 ? 'item' : 'items'}):
            </span>
            <span className="text-lg font-heading font-semibold text-primary">
              {formatPrice(item?.price * item?.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;