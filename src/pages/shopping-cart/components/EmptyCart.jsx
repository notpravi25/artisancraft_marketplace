import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: 2500,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop",
      artisan: "Priya Sharma",
      category: "Textiles"
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      price: 3200,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      artisan: "Rajesh Kumar",
      category: "Pottery"
    },
    {
      id: 3,
      name: "Wooden Jewelry Box",
      price: 1800,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop",
      artisan: "Meera Devi",
      category: "Woodwork"
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  const handleStartShopping = () => {
    navigate('/product-details');
  };

  const handleProductClick = (productId) => {
    navigate(`/product-details?id=${productId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      {/* Empty Cart Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-3">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Discover unique handcrafted items from talented artisans. 
          Start exploring our collection to find something special.
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          variant="default"
          size="lg"
          onClick={handleStartShopping}
          iconName="Search"
          iconPosition="left"
        >
          Start Shopping
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/user-profile-settings')}
          iconName="Heart"
          iconPosition="left"
        >
          View Wishlist
        </Button>
      </div>
      {/* Featured Products */}
      <div className="text-left">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
          Featured Handcrafted Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts?.map((product) => (
            <div
              key={product?.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-warm-sm transition-smooth cursor-pointer hover-lift"
              onClick={() => handleProductClick(product?.id)}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-semibold text-card-foreground mb-2 line-clamp-2">
                  {product?.name}
                </h4>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={10} color="var(--color-secondary-foreground)" />
                  </div>
                  <span className="text-sm text-muted-foreground font-caption">
                    by {product?.artisan}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {product?.category}
                  </span>
                  <span className="text-lg font-heading font-semibold text-primary">
                    {formatPrice(product?.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Benefits Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={24} color="var(--color-primary-foreground)" />
          </div>
          <h4 className="font-heading font-semibold text-foreground mb-2">
            Secure Shopping
          </h4>
          <p className="text-sm text-muted-foreground">
            Your payments and personal information are always protected
          </p>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Truck" size={24} color="var(--color-primary-foreground)" />
          </div>
          <h4 className="font-heading font-semibold text-foreground mb-2">
            Fast Delivery
          </h4>
          <p className="text-sm text-muted-foreground">
            Quick and reliable shipping directly from artisans
          </p>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} color="var(--color-primary-foreground)" />
          </div>
          <h4 className="font-heading font-semibold text-foreground mb-2">
            Authentic Crafts
          </h4>
          <p className="text-sm text-muted-foreground">
            Every item is handmade with love and traditional techniques
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;