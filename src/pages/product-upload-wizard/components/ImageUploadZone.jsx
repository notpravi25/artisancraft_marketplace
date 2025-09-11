import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImageUploadZone = ({ images, onImagesChange, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files)?.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return validTypes?.includes(file?.type) && file?.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles?.length > 0) {
      const newImages = validFiles?.map((file, index) => ({
        id: Date.now() + index,
        file,
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size
      }));
      
      onImagesChange([...images, ...newImages]);
    }
  };

  const removeImage = (imageId) => {
    const updatedImages = images?.filter(img => img?.id !== imageId);
    onImagesChange(updatedImages);
  };

  const reorderImages = (dragIndex, hoverIndex) => {
    const draggedImage = images?.[dragIndex];
    const newImages = [...images];
    newImages?.splice(dragIndex, 1);
    newImages?.splice(hoverIndex, 0, draggedImage);
    onImagesChange(newImages);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          dragActive 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            dragActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name="Upload" size={24} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {dragActive ? 'Drop your images here' : 'Upload Product Images'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Drag and drop your craft images here, or click to browse. 
              Support for JPEG, PNG, WebP formats up to 10MB each.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Image" size={14} />
              <span>Multiple images</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} />
              <span>Auto compression</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} />
              <span>Max 10MB</span>
            </div>
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-sm font-medium text-foreground">Processing images...</span>
            </div>
          </div>
        )}
      </div>
      {/* Image Previews */}
      {images?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Uploaded Images ({images?.length})
            </h4>
            <button
              onClick={() => onImagesChange([])}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear all
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images?.map((image, index) => (
              <div
                key={image?.id}
                className="relative group bg-card border border-border rounded-lg overflow-hidden hover:shadow-warm-sm transition-all duration-200"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={image?.url}
                    alt={image?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-card-foreground truncate">
                        {image?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(image?.size)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeImage(image?.id)}
                      className="ml-2 p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                  
                  {index === 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-primary" />
                      <span className="text-xs text-primary font-medium">Primary</span>
                    </div>
                  )}
                </div>
                
                {/* Reorder handles */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-background/80 backdrop-blur-sm rounded-md p-1">
                    <Icon name="GripVertical" size={14} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Image Tips:</p>
                <ul className="space-y-1">
                  <li>• First image will be used as the primary product image</li>
                  <li>• High-quality images help generate better AI descriptions</li>
                  <li>• Show different angles and details of your craft</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;