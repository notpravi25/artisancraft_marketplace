import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, currentProductId }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  const handleProductClick = (productId) => {
    navigate(`/product-details?id=${productId}`);
    window.scrollTo(0, 0);
  };

  const filteredProducts = products?.filter(product => product?.id !== currentProductId);

  if (filteredProducts?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          You Might Also Like
        </h2>
        <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.slice(0, 8)?.map((product) => (
          <div
            key={product?.id}
            className="bg-card rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth hover-lift cursor-pointer group"
            onClick={() => handleProductClick(product?.id)}
          >
            {/* Product Image */}
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product?.images?.[0]}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Quick Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Add to wishlist logic
                  }}
                  className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-smooth"
                >
                  <Icon name="Heart" size={14} />
                </button>
              </div>

              {/* Discount Badge */}
              {product?.discount && (
                <div className="absolute top-3 left-3">
                  <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
                    {product?.discount}% OFF
                  </span>
                </div>
              )}

              {/* Rating Badge */}
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} color="var(--color-warning)" className="fill-current" />
                  <span className="text-xs font-data text-foreground">
                    {product?.rating?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                  {product?.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  by {product?.artisan?.name}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-heading font-semibold text-primary">
                      {formatPrice(product?.price)}
                    </span>
                    {product?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product?.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Truck" size={12} className="text-success" />
                    <span className="text-xs text-success">Free Shipping</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Add to cart logic
                  }}
                  className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-smooth opacity-0 group-hover:opacity-100"
                >
                  <Icon name="ShoppingCart" size={14} />
                </button>
              </div>

              {/* Product Tags */}
              {product?.tags && product?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {product?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      {filteredProducts?.length > 8 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/products')}
            iconName="Grid"
            iconPosition="left"
          >
            Explore More Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;