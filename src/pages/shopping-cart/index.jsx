import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import VoiceControl from './components/VoiceControl';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Handwoven Kashmiri Pashmina Shawl",
      price: 8500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      artisan: "Priya Sharma",
      category: "Textiles",
      inStock: true
    },
    {
      id: 2,
      name: "Blue Pottery Ceramic Dinner Set",
      price: 4200,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      artisan: "Rajesh Kumar",
      category: "Pottery",
      inStock: true
    },
    {
      id: 3,
      name: "Carved Wooden Jewelry Box",
      price: 2800,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      artisan: "Meera Devi",
      category: "Woodwork",
      inStock: true
    }
  ];

  useEffect(() => {
    // Load cart items from localStorage or use mock data
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems(mockCartItems);
      localStorage.setItem('cartItems', JSON.stringify(mockCartItems));
    }

    // Load language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Update cart count in localStorage for header
    const totalItems = mockCartItems?.reduce((sum, item) => sum + item?.quantity, 0);
    localStorage.setItem('cartCount', totalItems?.toString());
  }, []);

  const updateCartInStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Update cart count
    const totalItems = updatedCart?.reduce((sum, item) => sum + item?.quantity, 0);
    localStorage.setItem('cartCount', totalItems?.toString());
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems?.map(item =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCartInStorage(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems?.filter(item => item?.id !== itemId);
    updateCartInStorage(updatedCart);
  };

  const handleMoveToWishlist = (itemId) => {
    const item = cartItems?.find(item => item?.id === itemId);
    if (item) {
      // Add to wishlist (mock implementation)
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      wishlist?.push(item);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      
      // Remove from cart
      handleRemoveItem(itemId);
    }
  };

  const handleApplyPromoCode = (code, discount) => {
    setAppliedPromoCode(code);
    setPromoDiscount(discount);
  };

  const handleProceedToCheckout = async () => {
    setIsCheckoutLoading(true);
    
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, show success message and redirect
    alert('Redirecting to secure checkout...');
    setIsCheckoutLoading(false);
    
    // In a real app, this would navigate to checkout page
    // navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/product-details');
  };

  const handleVoiceCommand = (command, itemId, value) => {
    switch (command) {
      case 'remove':
        if (itemId) {
          handleRemoveItem(itemId);
          speak(`Item removed from cart`);
        }
        break;
      case 'clear':
        updateCartInStorage([]);
        speak('Cart cleared');
        break;
      case 'increase':
        if (itemId) {
          const item = cartItems?.find(item => item?.id === itemId);
          if (item) {
            handleUpdateQuantity(itemId, item?.quantity + 1);
            speak(`Quantity increased to ${item?.quantity + 1}`);
          }
        }
        break;
      case 'decrease':
        if (itemId) {
          const item = cartItems?.find(item => item?.id === itemId);
          if (item && item?.quantity > 1) {
            handleUpdateQuantity(itemId, item?.quantity - 1);
            speak(`Quantity decreased to ${item?.quantity - 1}`);
          }
        }
        break;
      case 'set-quantity':
        if (itemId && value) {
          handleUpdateQuantity(itemId, value);
          speak(`Quantity set to ${value}`);
        }
        break;
      case 'checkout':
        handleProceedToCheckout();
        speak('Proceeding to checkout');
        break;
      case 'continue-shopping':
        handleContinueShopping();
        speak('Continuing shopping');
        break;
      case 'show-total':
        const total = calculateSubtotal();
        speak(`Your cart total is ${formatPrice(total)}`);
        break;
      case 'help':
        setShowVoiceHelp(true);
        speak('Voice commands help displayed');
        break;
      default:
        speak('Command not recognized. Say help for available commands.');
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  const translations = {
    en: {
      title: 'Shopping Cart',
      continueShopping: 'Continue Shopping',
      itemsInCart: 'items in cart',
      emptyCart: 'Your cart is empty'
    },
    hi: {
      title: 'खरीदारी की टोकरी',
      continueShopping: 'खरीदारी जारी रखें',
      itemsInCart: 'टोकरी में वस्तुएं',
      emptyCart: 'आपकी टोकरी खाली है'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>{t?.title} - ArtisanCraft Marketplace</title>
          <meta name="description" content="Review and manage items in your shopping cart" />
        </Helmet>
        <Header />
        <main className="pt-16">
          <EmptyCart />
        </main>
        <VoiceControl onVoiceCommand={handleVoiceCommand} cartItems={cartItems} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t?.title} ({cartItems?.length} {t?.itemsInCart}) - ArtisanCraft Marketplace</title>
        <meta name="description" content="Review and manage items in your shopping cart before checkout" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {t?.title}
              </h1>
              <p className="text-muted-foreground">
                {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleContinueShopping}
              iconName="ArrowLeft"
              iconPosition="left"
              className="mt-4 sm:mt-0"
            >
              {t?.continueShopping}
            </Button>
          </div>

          {/* Cart Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems?.map((item) => (
                <CartItem
                  key={item?.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onMoveToWishlist={handleMoveToWishlist}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={calculateSubtotal()}
                onApplyPromoCode={handleApplyPromoCode}
                onProceedToCheckout={handleProceedToCheckout}
                isCheckoutLoading={isCheckoutLoading}
                appliedPromoCode={appliedPromoCode}
                promoDiscount={promoDiscount}
              />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">Secure Payment</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Truck" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">Fast Delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="RotateCcw" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">Easy Returns</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Headphones" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">24/7 Support</span>
            </div>
          </div>
        </div>
      </main>
      {/* Voice Control */}
      <VoiceControl onVoiceCommand={handleVoiceCommand} cartItems={cartItems} />
      {/* Voice Help Modal */}
      {showVoiceHelp && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-card-foreground">
                Voice Commands
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVoiceHelp(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong>Remove items:</strong> "Remove [item name]" or "Clear cart"</p>
              <p><strong>Update quantity:</strong> "Set quantity to [number]"</p>
              <p><strong>Navigation:</strong> "Proceed to checkout" or "Continue shopping"</p>
              <p><strong>Information:</strong> "Show total"</p>
              <p><strong>Help:</strong> "Help" for this dialog</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;