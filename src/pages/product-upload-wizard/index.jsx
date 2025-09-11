import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ImageUploadZone from './components/ImageUploadZone';
import PriceInput from './components/PriceInput';
import AIDescriptionGenerator from './components/AIDescriptionGenerator';
import ProgressSteps from './components/ProgressSteps';
import PublishActions from './components/PublishActions';

const ProductUploadWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Product data state
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priceError, setPriceError] = useState('');
  
  // Loading states
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'artisan') {
      navigate('/artisan-registration');
      return;
    }
    
    setIsAuthenticated(true);
  }, [navigate]);

  useEffect(() => {
    // Update completed steps based on form data
    const newCompletedSteps = [];
    
    if (images?.length > 0) {
      newCompletedSteps?.push(1);
    }
    
    if (price && !priceError) {
      newCompletedSteps?.push(2);
    }
    
    if (description) {
      newCompletedSteps?.push(3);
    }
    
    setCompletedSteps(newCompletedSteps);
  }, [images, price, description, priceError]);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    if (newImages?.length > 0 && currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
    setPriceError('');
    
    if (newPrice) {
      const numericPrice = parseInt(newPrice);
      if (numericPrice < 50) {
        setPriceError('Minimum price should be ₹50');
      } else if (numericPrice > 10000000) {
        setPriceError('Maximum price should be ₹1,00,00,000');
      } else if (currentStep === 2) {
        setCurrentStep(3);
      }
    }
  };

  const handleDescriptionGenerated = (newDescription, suggestedCategory) => {
    setDescription(newDescription);
    setCategory(suggestedCategory);
    if (newDescription && currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleGenerateDescription = () => {
    if (images?.length === 0) return;
    
    setIsGeneratingDescription(true);
    setCurrentStep(3);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGeneratingDescription(false);
    }, 6000);
  };

  const handlePublish = async (productData) => {
    setIsPublishing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful publish
      const productId = 'prod_' + Date.now();
      
      // Store in localStorage for demo
      const existingProducts = JSON.parse(localStorage.getItem('artisanProducts') || '[]');
      const newProduct = {
        id: productId,
        ...productData,
        createdAt: new Date()?.toISOString(),
        artisanId: 'artisan_123',
        views: 0,
        likes: 0
      };
      
      existingProducts?.push(newProduct);
      localStorage.setItem('artisanProducts', JSON.stringify(existingProducts));
      
      // Show success and redirect
      setTimeout(() => {
        navigate('/user-profile-settings', { 
          state: { 
            message: 'Product published successfully!',
            productId: productId
          }
        });
      }, 1000);
      
    } catch (error) {
      console.error('Publishing failed:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleStepNavigation = (stepNumber) => {
    if (stepNumber <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(stepNumber);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Upload Your Craft Images
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start by uploading high-quality images of your handcrafted product. 
                Clear, well-lit photos help our AI create better descriptions.
              </p>
            </div>
            
            <ImageUploadZone
              images={images}
              onImagesChange={handleImagesChange}
              isUploading={isUploading}
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Set Your Product Price
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Price your handcrafted product competitively. Consider materials, 
                time invested, and market value.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <PriceInput
                price={price}
                onPriceChange={handlePriceChange}
                error={priceError}
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Generate Product Description
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI will analyze your images and create a compelling product 
                description that tells your craft's story.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <AIDescriptionGenerator
                images={images}
                price={price}
                onDescriptionGenerated={handleDescriptionGenerated}
                generatedDescription={description}
                isGenerating={isGeneratingDescription}
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Review & Publish
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Review your product details and publish to make it available 
                to buyers on the marketplace.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <PublishActions
                images={images}
                price={price}
                description={description}
                category={category}
                onPublish={handlePublish}
                isPublishing={isPublishing}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <button
                onClick={() => navigate('/user-profile-settings')}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Product Upload Wizard
                </h1>
                <p className="text-muted-foreground">
                  Create your product listing in just a few simple steps
                </p>
              </div>
            </div>
            
            <ProgressSteps
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <Button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              variant="outline"
              iconName="ChevronLeft"
              iconPosition="left"
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4]?.map((step) => (
                <button
                  key={step}
                  onClick={() => handleStepNavigation(step)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    step === currentStep
                      ? 'bg-primary scale-125'
                      : completedSteps?.includes(step)
                      ? 'bg-success' :'bg-border hover:bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={() => {
                if (currentStep === 3 && !description) {
                  handleGenerateDescription();
                } else {
                  setCurrentStep(Math.min(4, currentStep + 1));
                }
              }}
              variant="default"
              iconName="ChevronRight"
              iconPosition="right"
              disabled={
                currentStep === 4 || 
                (currentStep === 1 && images?.length === 0) ||
                (currentStep === 2 && (!price || priceError)) ||
                isGeneratingDescription
              }
            >
              {currentStep === 3 && !description ? 'Generate Description' : 'Next'}
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-foreground">Need Help?</h3>
                  <p className="text-xs text-muted-foreground">
                    Having trouble with the upload process? Our support team is here to help you 
                    showcase your crafts in the best possible way.
                  </p>
                  <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductUploadWizard;