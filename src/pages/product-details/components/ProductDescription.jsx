import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductDescription = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isReadingAloud) {
        window.speechSynthesis?.cancel();
        setIsReadingAloud(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(product.description);
        utterance.onend = () => setIsReadingAloud(false);
        window.speechSynthesis?.speak(utterance);
        setIsReadingAloud(true);
      }
    }
  };

  const truncatedDescription = product?.description?.length > 300 
    ? product?.description?.substring(0, 300) + "..."
    : product?.description;

  return (
    <div className="space-y-6">
      {/* Description Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Product Description
        </h2>
        <button
          onClick={handleReadAloud}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
            isReadingAloud 
              ? 'bg-primary text-primary-foreground voice-pulse' 
              : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
          }`}
          title={isReadingAloud ? "Stop reading" : "Read aloud"}
        >
          <Icon name={isReadingAloud ? "VolumeX" : "Volume2"} size={16} />
          <span className="text-sm font-medium">
            {isReadingAloud ? "Stop" : "Listen"}
          </span>
        </button>
      </div>
      {/* AI-Generated Description */}
      <div className="bg-card rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={14} color="var(--color-accent-foreground)" />
          </div>
          <span className="text-sm font-medium text-accent">AI-Generated Description</span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {isExpanded ? product?.description : truncatedDescription}
          </p>
        </div>

        {product?.description?.length > 300 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth"
          >
            <span className="text-sm font-medium">
              {isExpanded ? "Show Less" : "Read More"}
            </span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        )}
      </div>
      {/* Product Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Package" size={16} />
            <span>Product Details</span>
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Materials:</span>
              <span className="text-foreground font-medium">{product?.materials}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dimensions:</span>
              <span className="text-foreground font-medium">{product?.dimensions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weight:</span>
              <span className="text-foreground font-medium">{product?.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Creation Time:</span>
              <span className="text-foreground font-medium">{product?.creationTime}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Heart" size={16} />
            <span>Care Instructions</span>
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {product?.careInstructions?.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>{instruction}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Cultural Significance */}
      {product?.culturalSignificance && (
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-6">
          <h3 className="font-medium text-foreground flex items-center space-x-2 mb-3">
            <Icon name="Globe" size={16} />
            <span>Cultural Heritage</span>
          </h3>
          <p className="text-foreground leading-relaxed text-sm">
            {product?.culturalSignificance}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;