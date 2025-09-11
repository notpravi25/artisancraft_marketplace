import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VoiceControl = ({ onCommand, isActive, onToggle }) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-IN';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        if (isActive) {
          // Restart recognition if still active
          setTimeout(() => {
            try {
              recognitionInstance?.start();
            } catch (error) {
              console.log('Recognition restart failed:', error);
            }
          }, 100);
        }
      };

      recognitionInstance.onresult = (event) => {
        const lastResult = event?.results?.[event?.results?.length - 1];
        if (lastResult?.isFinal) {
          const command = lastResult?.[0]?.transcript?.toLowerCase()?.trim();
          setLastCommand(command);
          processVoiceCommand(command);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (recognition) {
      if (isActive && !isListening) {
        try {
          recognition?.start();
        } catch (error) {
          console.log('Recognition start failed:', error);
        }
      } else if (!isActive && isListening) {
        recognition?.stop();
      }
    }
  }, [isActive, recognition]);

  const processVoiceCommand = (command) => {
    const commands = {
      'add to cart': () => onCommand('addToCart'),
      'buy now': () => onCommand('buyNow'),
      'read description': () => onCommand('readDescription'),
      'show reviews': () => onCommand('showReviews'),
      'zoom image': () => onCommand('zoomImage'),
      'next image': () => onCommand('nextImage'),
      'previous image': () => onCommand('previousImage'),
      'increase quantity': () => onCommand('increaseQuantity'),
      'decrease quantity': () => onCommand('decreaseQuantity'),
      'add to wishlist': () => onCommand('addToWishlist'),
      'share product': () => onCommand('shareProduct'),
      'go back': () => onCommand('goBack'),
      'scroll up': () => onCommand('scrollUp'),
      'scroll down': () => onCommand('scrollDown'),
    };

    // Find matching command
    const matchedCommand = Object.keys(commands)?.find(cmd => 
      command?.includes(cmd) || cmd?.includes(command)
    );

    if (matchedCommand) {
      commands?.[matchedCommand]();
      showCommandFeedback(matchedCommand);
    } else {
      showCommandFeedback('Command not recognized');
    }
  };

  const showCommandFeedback = (command) => {
    // Visual feedback for recognized commands
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-20 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-warm-lg z-50 transition-smooth';
    feedback.textContent = `Command: ${command}`;
    document.body?.appendChild(feedback);

    setTimeout(() => {
      feedback?.remove();
    }, 2000);
  };

  const availableCommands = [
    'Add to cart',
    'Buy now',
    'Read description',
    'Show reviews',
    'Zoom image',
    'Next image',
    'Previous image',
    'Increase quantity',
    'Decrease quantity',
    'Add to wishlist',
    'Share product',
    'Go back',
    'Scroll up',
    'Scroll down'
  ];

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice Control Button */}
      <button
        onClick={onToggle}
        className={`w-14 h-14 rounded-full shadow-warm-lg transition-smooth flex items-center justify-center ${
          isActive
            ? 'bg-primary text-primary-foreground voice-pulse'
            : 'bg-background border border-border hover:bg-muted'
        }`}
        title={isActive ? 'Disable voice control' : 'Enable voice control'}
      >
        <Icon 
          name={isListening ? "MicIcon" : "Mic"} 
          size={20} 
          className={isListening ? "animate-pulse" : ""}
        />
      </button>
      {/* Voice Status Indicator */}
      {isActive && (
        <div className="absolute -top-12 right-0 bg-background border border-border rounded-lg px-3 py-2 shadow-warm">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-success animate-pulse' : 'bg-muted'}`} />
            <span className="text-xs text-foreground">
              {isListening ? 'Listening...' : 'Voice Ready'}
            </span>
          </div>
        </div>
      )}
      {/* Command Help Panel */}
      {isActive && (
        <div className="absolute bottom-16 right-0 w-64 bg-popover border border-border rounded-lg shadow-warm-lg p-4 max-h-80 overflow-y-auto">
          <h3 className="font-medium text-popover-foreground mb-3 flex items-center space-x-2">
            <Icon name="HelpCircle" size={16} />
            <span>Voice Commands</span>
          </h3>
          <div className="space-y-2">
            {availableCommands?.map((command, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-popover-foreground transition-smooth"
              >
                <Icon name="Mic" size={12} />
                <span>"{command}"</span>
              </div>
            ))}
          </div>
          
          {lastCommand && (
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Last command:</p>
              <p className="text-sm text-accent font-medium">"{lastCommand}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceControl;