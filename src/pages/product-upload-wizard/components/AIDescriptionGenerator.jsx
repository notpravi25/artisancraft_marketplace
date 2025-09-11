import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIDescriptionGenerator = ({ 
  images, 
  price, 
  onDescriptionGenerated, 
  generatedDescription, 
  isGenerating 
}) => {
  const [description, setDescription] = useState(generatedDescription || '');
  const [suggestedCategory, setSuggestedCategory] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [analysisSteps, setAnalysisSteps] = useState([]);

  useEffect(() => {
    setDescription(generatedDescription || '');
  }, [generatedDescription]);

  const generateDescription = async () => {
    if (images?.length === 0) return;

    // Simulate AI analysis steps
    const steps = [
      'Analyzing uploaded images...',
      'Identifying craft materials and techniques...',
      'Detecting artistic style and cultural elements...',
      'Generating compelling product story...',
      'Optimizing for marketplace appeal...'
    ];

    setAnalysisSteps([]);
    setGenerationProgress(0);

    // Simulate progressive analysis
    for (let i = 0; i < steps?.length; i++) {
      setTimeout(() => {
        setAnalysisSteps(prev => [...prev, { step: steps?.[i], completed: false }]);
        setGenerationProgress((i + 1) * 20);
        
        setTimeout(() => {
          setAnalysisSteps(prev => 
            prev?.map((item, index) => 
              index === i ? { ...item, completed: true } : item
            )
          );
        }, 800);
      }, i * 1200);
    }

    // Generate mock description after analysis
    setTimeout(() => {
      const mockDescriptions = [
        `Discover the timeless beauty of traditional Indian craftsmanship with this exquisite handwoven textile piece. Each thread tells a story of generations-old techniques passed down through skilled artisan families.\n\nCrafted with meticulous attention to detail, this stunning creation showcases the rich cultural heritage of Indian handloom traditions. The intricate patterns and vibrant colors are achieved through natural dyes and time-honored weaving methods.\n\nPerfect for adding an authentic touch to your home decor or as a meaningful gift for someone who appreciates genuine artistry. This piece represents not just a product, but a connection to India's magnificent craft legacy.\n\nDimensions and care instructions included with purchase.`,
        
        `Experience the magic of authentic Indian pottery with this beautifully crafted ceramic masterpiece. Shaped by skilled hands using traditional wheel techniques, each piece is unique and carries the soul of its creator.\n\nThe earthy tones and organic textures reflect the natural clay sourced from local regions, fired in traditional kilns to achieve the perfect finish. The subtle variations in color and form make each piece a one-of-a-kind treasure.\n\nIdeal for both functional use and decorative display, this handcrafted pottery brings warmth and character to any space. The time-honored techniques used in its creation ensure durability while maintaining the authentic charm of traditional Indian ceramics.\n\nA perfect addition to your collection or a thoughtful gift for pottery enthusiasts.`,
        
        `Immerse yourself in the intricate world of Indian metalwork with this stunning handcrafted piece. Created using ancient techniques of hammering, engraving, and finishing, this artwork showcases the exceptional skill of traditional metal artisans.\n\nEvery curve and detail has been carefully shaped by experienced craftspeople who have inherited these techniques through generations. The lustrous finish and precise patterns demonstrate the mastery required to create such exceptional pieces.\n\nThis versatile piece serves as both functional art and decorative accent, bringing elegance and cultural richness to any setting. The durability of traditional metalworking ensures this piece will be treasured for years to come.\n\nComes with authenticity certificate and care instructions.`
      ];

      const randomDescription = mockDescriptions?.[Math.floor(Math.random() * mockDescriptions?.length)];
      const categories = ['Textiles & Fabrics', 'Pottery & Ceramics', 'Metalwork & Jewelry', 'Wood Crafts', 'Home Decor'];
      const randomCategory = categories?.[Math.floor(Math.random() * categories?.length)];
      
      setDescription(randomDescription);
      setSuggestedCategory(randomCategory);
      onDescriptionGenerated(randomDescription, randomCategory);
    }, steps?.length * 1200 + 1000);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e?.target?.value);
    onDescriptionGenerated(e?.target?.value, suggestedCategory);
  };

  const enhanceDescription = () => {
    const enhancements = [
      '\n\n✨ Handcrafted with love and traditional techniques',
      '\n🌿 Made from sustainable, locally-sourced materials',
      '\n🎨 Each piece is unique with slight natural variations',
      '\n📦 Carefully packaged for safe delivery',
      '\n💝 Perfect for gifting or personal collection'
    ];
    
    const randomEnhancement = enhancements?.[Math.floor(Math.random() * enhancements?.length)];
    const enhancedDescription = description + randomEnhancement;
    setDescription(enhancedDescription);
    onDescriptionGenerated(enhancedDescription, suggestedCategory);
  };

  return (
    <div className="space-y-6">
      {/* Generation Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            AI Product Description
          </h3>
          {!isGenerating && !description && (
            <Button
              onClick={generateDescription}
              disabled={images?.length === 0}
              iconName="Sparkles"
              iconPosition="left"
              variant="default"
            >
              Generate Description
            </Button>
          )}
        </div>

        {images?.length === 0 && (
          <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-warning">
              Please upload at least one image to generate AI description
            </span>
          </div>
        )}
      </div>
      {/* Generation Progress */}
      {isGenerating && (
        <div className="space-y-4 p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-sm font-medium text-card-foreground">
              AI is analyzing your craft...
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Analysis Progress</span>
              <span>{generationProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${generationProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-2">
            {analysisSteps?.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  step?.completed 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted animate-pulse'
                }`}>
                  {step?.completed && <Icon name="Check" size={10} />}
                </div>
                <span className={`text-sm ${
                  step?.completed ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step?.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Generated Description */}
      {description && !isGenerating && (
        <div className="space-y-4">
          {/* Category Suggestion */}
          {suggestedCategory && (
            <div className="flex items-center space-x-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Icon name="Tag" size={16} className="text-primary" />
              <span className="text-sm text-primary">
                Suggested Category: <strong>{suggestedCategory}</strong>
              </span>
            </div>
          )}

          {/* Description Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Product Description
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={enhanceDescription}
                  variant="ghost"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Enhance
                </Button>
                <Button
                  onClick={generateDescription}
                  variant="ghost"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Regenerate
                </Button>
              </div>
            </div>

            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full h-48 p-4 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="AI-generated description will appear here..."
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{description?.length} characters</span>
              <span>Recommended: 200-500 characters for better engagement</span>
            </div>
          </div>

          {/* Description Quality Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
              <Icon name="Eye" size={14} className="text-primary" />
              <span className="text-xs text-foreground">Engaging</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
              <Icon name="Heart" size={14} className="text-primary" />
              <span className="text-xs text-foreground">Emotional</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
              <Icon name="Star" size={14} className="text-primary" />
              <span className="text-xs text-foreground">Authentic</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg">
              <Icon name="Target" size={14} className="text-primary" />
              <span className="text-xs text-foreground">Focused</span>
            </div>
          </div>
        </div>
      )}
      {/* AI Tips */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
        <div className="flex items-start space-x-2">
          <Icon name="Brain" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">AI Description Tips</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Clear, well-lit images help generate better descriptions</li>
              <li>• Multiple angles provide more context for AI analysis</li>
              <li>• You can edit and personalize the generated content</li>
              <li>• Include cultural significance and crafting techniques</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDescriptionGenerator;