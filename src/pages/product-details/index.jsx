import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductDescription from './components/ProductDescription';
import ReviewsSection from './components/ReviewsSection';
import RelatedProducts from './components/RelatedProducts';
import VoiceControl from './components/VoiceControl';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock product data
  const mockProducts = [
    {
      id: "1",
      name: "Handwoven Kashmiri Pashmina Shawl",
      price: 8500,
      originalPrice: 12000,
      discount: 29,
      rating: 4.8,
      reviewCount: 127,
      stock: 5,
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1566479179817-c0b4e8b8b5b5?w=800&h=800&fit=crop"
      ],
      artisan: {
        id: "art1",
        name: "Meera Devi",
        location: "Srinagar, Kashmir",
        rating: 4.9,
        totalProducts: 23
      },
      description: `This exquisite Kashmiri Pashmina shawl represents centuries of traditional craftsmanship passed down through generations. Hand-woven by skilled artisans in the pristine valleys of Kashmir, each thread tells a story of cultural heritage and artistic excellence.\n\nCrafted from the finest Pashmina wool sourced from high-altitude Changthangi goats, this shawl offers unparalleled softness and warmth. The intricate patterns are inspired by traditional Kashmiri motifs, featuring delicate paisley designs and floral elements that symbolize prosperity and natural beauty.\n\nThe weaving process takes approximately 3-4 weeks, with each artisan dedicating meticulous attention to detail. The natural dyes used create rich, lasting colors that enhance the shawl's elegance. This piece is not just an accessory but a wearable work of art that connects you to Kashmir's rich textile tradition.`,
      materials: "100% Pure Pashmina Wool",
      dimensions: "200cm x 70cm",
      weight: "180 grams",
      creationTime: "3-4 weeks",
      careInstructions: [
        "Dry clean only to maintain fabric integrity",
        "Store in a breathable cotton bag",
        "Avoid direct sunlight for extended periods",
        "Handle with clean, dry hands",
        "Professional cleaning recommended annually"
      ],
      culturalSignificance: "Kashmiri Pashmina weaving is a UNESCO-recognized intangible cultural heritage. This ancient craft represents the artistic soul of Kashmir, where each shawl embodies the region's natural beauty and the weaver's spiritual connection to their craft. The traditional motifs carry deep cultural meanings, often representing elements of nature and spiritual beliefs.",
      variants: [
        { id: "v1", name: "Classic Beige", price: 8500 },
        { id: "v2", name: "Royal Blue", price: 9000 },
        { id: "v3", name: "Emerald Green", price: 9200 }
      ],
      tags: ["Handwoven", "Traditional", "Luxury", "Kashmir", "Pashmina"],
      category: "Textiles"
    },
    {
      id: "2",
      name: "Rajasthani Blue Pottery Vase",
      price: 2800,
      originalPrice: 3500,
      discount: 20,
      rating: 4.6,
      reviewCount: 89,
      stock: 12,
      images: [
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop"
      ],
      artisan: {
        id: "art2",
        name: "Ramesh Kumar",
        location: "Jaipur, Rajasthan",
        rating: 4.7,
        totalProducts: 45
      },
      description: `This stunning Blue Pottery vase showcases the vibrant artistic tradition of Rajasthan, where skilled craftsmen have perfected this unique ceramic art form over centuries. The distinctive blue and white patterns are hand-painted using traditional techniques that create mesmerizing geometric and floral designs.\n\nMade from a special blend of quartz, raw glaze, and multani mitti (Fuller's earth), this pottery is fired at high temperatures to achieve its characteristic translucent quality. The cobalt blue pigment creates the signature color that has made Rajasthani Blue Pottery famous worldwide.\n\nEach piece is individually crafted and painted, making every vase unique. The intricate patterns draw inspiration from Mughal architecture and Persian art, reflecting the rich cultural synthesis that defines Rajasthani craftsmanship.`,
      materials: "Quartz, Raw Glaze, Multani Mitti",
      dimensions: "25cm height x 15cm diameter",
      weight: "800 grams",
      creationTime: "2-3 weeks",
      careInstructions: [
        "Clean with soft, damp cloth",
        "Avoid harsh chemicals or abrasives",
        "Handle with care to prevent chipping",
        "Display away from direct heat sources"
      ],
      culturalSignificance: "Blue Pottery is a traditional craft of Jaipur that originated in Persia and was brought to India by Mughal rulers. This art form represents the cultural fusion that characterizes Indian craftsmanship, blending Persian techniques with local artistic sensibilities.",
      tags: ["Ceramic", "Blue Pottery", "Rajasthani", "Handpainted", "Traditional"],
      category: "Ceramics"
    }
  ];

  const mockReviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely beautiful shawl! The quality is exceptional and the craftsmanship is evident in every detail. It's incredibly soft and warm. Worth every rupee!",
      verified: true,
      helpfulCount: 23,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop"]
    },
    {
      id: 2,
      name: "Rajesh Gupta",
      rating: 4,
      date: "2024-01-10",
      comment: "Great product and fast delivery. The shawl is exactly as described. My wife loves it. The packaging was also very good.",
      verified: true,
      helpfulCount: 15
    },
    {
      id: 3,
      name: "Anita Desai",
      rating: 5,
      date: "2024-01-05",
      comment: "This is my second purchase from this artisan. The quality is consistently excellent. The intricate patterns are mesmerizing and the softness is unmatched.",
      verified: true,
      helpfulCount: 31,
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 4,
      date: "2023-12-28",
      comment: "Beautiful craftsmanship. Took a bit longer to arrive but it was worth the wait. Perfect gift for my mother.",
      verified: true,
      helpfulCount: 8
    },
    {
      id: 5,
      name: "Kavita Patel",
      rating: 5,
      date: "2023-12-20",
      comment: "Exceeded my expectations! The colors are vibrant and the texture is amazing. Supporting traditional artisans feels great too.",
      verified: true,
      helpfulCount: 19
    }
  ];

  useEffect(() => {
    // Get product ID from URL params
    const productId = searchParams?.get('id') || '1';
    
    // Simulate API call
    const fetchProduct = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundProduct = mockProducts?.find(p => p?.id === productId);
        setProduct(foundProduct || mockProducts?.[0]);
        setRelatedProducts(mockProducts?.filter(p => p?.id !== productId));
        setIsLoading(false);
      }, 500);
    };

    fetchProduct();

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, [searchParams]);

  const handleAddToCart = (quantity, variant) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const cartItem = {
        productId: product?.id,
        name: product?.name,
        price: variant?.price || product?.price,
        quantity,
        variant: variant?.name,
        image: product?.images?.[0],
        artisan: product?.artisan?.name
      };

      // Update cart in localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart?.findIndex(
        item => item?.productId === cartItem?.productId && item?.variant === cartItem?.variant
      );

      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart?.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));
      localStorage.setItem('cartCount', existingCart?.reduce((sum, item) => sum + item?.quantity, 0)?.toString());

      setIsLoading(false);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-20 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-warm-lg z-50';
      successMsg.textContent = 'Added to cart successfully!';
      document.body?.appendChild(successMsg);
      setTimeout(() => successMsg?.remove(), 3000);
    }, 1000);
  };

  const handleBuyNow = (quantity, variant) => {
    // Add to cart first, then navigate to checkout
    handleAddToCart(quantity, variant);
    setTimeout(() => {
      navigate('/shopping-cart');
    }, 1000);
  };

  const handleVoiceCommand = (command) => {
    switch (command) {
      case 'addToCart':
        handleAddToCart(1, product?.variants?.[0]);
        break;
      case 'buyNow':
        handleBuyNow(1, product?.variants?.[0]);
        break;
      case 'readDescription':
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(product.description);
          window.speechSynthesis?.speak(utterance);
        }
        break;
      case 'showReviews':
        document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'zoomImage':
        // Trigger zoom functionality
        break;
      case 'nextImage':
        // Trigger next image
        break;
      case 'previousImage':
        // Trigger previous image
        break;
      case 'increaseQuantity':
        // Trigger quantity increase
        break;
      case 'decreaseQuantity':
        // Trigger quantity decrease
        break;
      case 'addToWishlist':
        // Trigger wishlist add
        break;
      case 'shareProduct':
        if (navigator.share) {
          navigator.share({
            title: product?.name,
            text: product?.description,
            url: window.location?.href,
          });
        }
        break;
      case 'goBack':
        navigate(-1);
        break;
      case 'scrollUp':
        window.scrollBy({ top: -300, behavior: 'smooth' });
        break;
      case 'scrollDown':
        window.scrollBy({ top: 300, behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  if (isLoading && !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h2 className="text-xl font-heading font-semibold text-foreground">Product Not Found</h2>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')} iconName="ArrowLeft" iconPosition="left">
              Go Back Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <button
                onClick={() => navigate('/products')}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                Products
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">{product?.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={product?.images} productName={product?.name} />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-12">
            <ProductDescription product={product} />
          </div>

          {/* Reviews Section */}
          <div id="reviews-section" className="mb-12">
            <ReviewsSection
              reviews={mockReviews}
              averageRating={product?.rating}
              totalReviews={product?.reviewCount}
            />
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <RelatedProducts
              products={relatedProducts}
              currentProductId={product?.id}
            />
          </div>
        </div>
      </main>
      {/* Voice Control */}
      <VoiceControl
        onCommand={handleVoiceCommand}
        isActive={isVoiceActive}
        onToggle={() => setIsVoiceActive(!isVoiceActive)}
      />
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 w-12 h-12 bg-secondary text-secondary-foreground rounded-full shadow-warm-lg hover:shadow-warm transition-smooth flex items-center justify-center z-40"
        title="Back to top"
      >
        <Icon name="ArrowUp" size={20} />
      </button>
    </div>
  );
};

export default ProductDetails;