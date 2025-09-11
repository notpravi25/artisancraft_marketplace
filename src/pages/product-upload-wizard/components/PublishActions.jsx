import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const PublishActions = ({ 
  images, 
  price, 
  description, 
  category, 
  onPublish, 
  isPublishing 
}) => {
  const [publishMode, setPublishMode] = useState('live'); // 'live' or 'draft'
  const navigate = useNavigate();

  const isReadyToPublish = images?.length > 0 && price && description;

  const handlePublish = async () => {
    if (!isReadyToPublish) return;

    const productData = {
      images,
      price,
      description,
      category,
      publishMode,
      publishedAt: publishMode === 'live' ? new Date()?.toISOString() : null,
      status: publishMode === 'live' ? 'published' : 'draft'
    };

    await onPublish(productData);
  };

  const handlePreview = () => {
    // Navigate to product details with preview mode
    navigate('/product-details', { 
      state: { 
        preview: true, 
        productData: { images, price, description, category } 
      } 
    });
  };

  const getPublishButtonText = () => {
    if (isPublishing) return 'Publishing...';
    return publishMode === 'live' ? 'Publish Product' : 'Save as Draft';
  };

  const getPublishButtonIcon = () => {
    if (isPublishing) return 'Loader';
    return publishMode === 'live' ? 'Send' : 'Save';
  };

  return (
    <div className="space-y-6">
      {/* Publish Mode Selection */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Publishing Options</h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPublishMode('live')}
            className={`p-4 rounded-lg border transition-all text-left ${
              publishMode === 'live' ?'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Icon name="Globe" size={20} className="mt-0.5" />
              <div>
                <p className="font-medium">Publish Live</p>
                <p className="text-xs opacity-80 mt-1">
                  Make your product visible to all buyers immediately
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPublishMode('draft')}
            className={`p-4 rounded-lg border transition-all text-left ${
              publishMode === 'draft' ?'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Icon name="FileText" size={20} className="mt-0.5" />
              <div>
                <p className="font-medium">Save as Draft</p>
                <p className="text-xs opacity-80 mt-1">
                  Save your work and publish later
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
      {/* Product Summary */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h4 className="text-sm font-medium text-card-foreground">Product Summary</h4>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Images</p>
            <p className="font-medium text-card-foreground flex items-center space-x-1">
              <Icon name="Image" size={14} />
              <span>{images?.length} uploaded</span>
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground">Price</p>
            <p className="font-medium text-card-foreground flex items-center space-x-1">
              <Icon name="IndianRupee" size={14} />
              <span>{price ? `₹${parseInt(price)?.toLocaleString('en-IN')}` : 'Not set'}</span>
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground">Description</p>
            <p className="font-medium text-card-foreground flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>{description ? `${description?.length} chars` : 'Not generated'}</span>
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground">Category</p>
            <p className="font-medium text-card-foreground flex items-center space-x-1">
              <Icon name="Tag" size={14} />
              <span>{category || 'Auto-suggested'}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Validation Checklist */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Pre-publish Checklist</h4>
        <div className="space-y-2">
          {[
            { label: 'At least one image uploaded', completed: images?.length > 0 },
            { label: 'Price set in Indian Rupees', completed: !!price },
            { label: 'Product description generated', completed: !!description },
            { label: 'Category selected or suggested', completed: !!category }
          ]?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                item?.completed 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {item?.completed && <Icon name="Check" size={12} />}
              </div>
              <span className={`text-sm ${
                item?.completed ? 'text-success' : 'text-muted-foreground'
              }`}>
                {item?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handlePreview}
          variant="outline"
          iconName="Eye"
          iconPosition="left"
          disabled={!isReadyToPublish}
          className="flex-1"
        >
          Preview Product
        </Button>
        
        <Button
          onClick={handlePublish}
          variant={publishMode === 'live' ? 'default' : 'secondary'}
          iconName={getPublishButtonIcon()}
          iconPosition="left"
          loading={isPublishing}
          disabled={!isReadyToPublish || isPublishing}
          className="flex-1"
        >
          {getPublishButtonText()}
        </Button>
      </div>
      {/* Publishing Guidelines */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">Publishing Guidelines</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Ensure images clearly show your craft from multiple angles</li>
              <li>• Verify pricing is competitive and includes all costs</li>
              <li>• Review AI-generated description for accuracy</li>
              <li>• Products go live immediately when published</li>
              <li>• You can edit product details anytime after publishing</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Success Message */}
      {!isReadyToPublish && (
        <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-sm text-warning">
            Complete all required steps to publish your product
          </span>
        </div>
      )}
    </div>
  );
};

export default PublishActions;