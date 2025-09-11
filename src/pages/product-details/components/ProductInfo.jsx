import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onBuyNow, isLoading }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Wishlist logic would go here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location?.href,
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                color={i < Math.floor(product?.rating) ? "var(--color-warning)" : "var(--color-muted-foreground)"}
                className={i < Math.floor(product?.rating) ? "fill-current" : ""}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              ({product?.reviewCount} reviews)
            </span>
          </div>
          <span className="text-sm text-success">In Stock</span>
        </div>
      </div>
      {/* Artisan Info */}
      <div className="flex items-center space-x-3 p-4 bg-card rounded-lg">
        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={20} color="var(--color-secondary-foreground)" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">Crafted by {product?.artisan?.name}</p>
          <p className="text-sm text-muted-foreground">{product?.artisan?.location}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/artisan/${product?.artisan?.id}`)}
        >
          View Profile
        </Button>
      </div>
      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-heading font-bold text-primary">
            {formatPrice(selectedVariant?.price || product?.price)}
          </span>
          {product?.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
          {product?.discount && (
            <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
              {product?.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Inclusive of all taxes • Free shipping above ₹500
        </p>
      </div>
      {/* Variants */}
      {product?.variants && product?.variants?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Available Options:</h3>
          <div className="flex flex-wrap gap-2">
            {product?.variants?.map((variant) => (
              <button
                key={variant?.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border transition-smooth ${
                  selectedVariant?.id === variant?.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                <span className="text-sm font-medium">{variant?.name}</span>
                {variant?.price !== product?.price && (
                  <span className="text-xs ml-2">+{formatPrice(variant?.price - product?.price)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Quantity:</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="w-12 text-center font-data">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stock}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.stock} items available
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            onClick={() => onAddToCart(quantity, selectedVariant)}
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleWishlistToggle}
            iconName={isWishlisted ? "Heart" : "Heart"}
            className={isWishlisted ? "text-error" : ""}
          >
            <Icon 
              name="Heart" 
              size={20} 
              className={isWishlisted ? "fill-current text-error" : ""} 
            />
          </Button>
        </div>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => onBuyNow(quantity, selectedVariant)}
          iconName="Zap"
          iconPosition="left"
        >
          Buy Now
        </Button>
      </div>
      {/* Additional Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name="Share2" size={16} />
          <span className="text-sm">Share</span>
        </button>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Truck" size={16} />
            <span>Free Delivery</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RotateCcw" size={16} />
            <span>7 Day Return</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;