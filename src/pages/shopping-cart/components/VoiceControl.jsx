import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceControl = ({ onVoiceCommand, cartItems }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [lastCommand, setLastCommand] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const command = event?.results?.[0]?.[0]?.transcript?.toLowerCase();
        setLastCommand(command);
        processVoiceCommand(command);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    }
  }, []);

  const processVoiceCommand = (command) => {
    const commandActions = {
      // Remove item commands
      'remove first item': () => onVoiceCommand('remove', cartItems?.[0]?.id),
      'remove last item': () => onVoiceCommand('remove', cartItems?.[cartItems?.length - 1]?.id),
      'clear cart': () => onVoiceCommand('clear'),
      
      // Quantity commands
      'increase quantity': () => onVoiceCommand('increase', cartItems?.[0]?.id),
      'decrease quantity': () => onVoiceCommand('decrease', cartItems?.[0]?.id),
      
      // Navigation commands
      'proceed to checkout': () => onVoiceCommand('checkout'),
      'continue shopping': () => onVoiceCommand('continue-shopping'),
      'apply promo code': () => onVoiceCommand('promo'),
      
      // General commands
      'show total': () => onVoiceCommand('show-total'),
      'help': () => onVoiceCommand('help')
    };

    // Check for specific item removal by name
    const removeItemMatch = command?.match(/remove (.+)/);
    if (removeItemMatch) {
      const itemName = removeItemMatch?.[1];
      const matchingItem = cartItems?.find(item => 
        item?.name?.toLowerCase()?.includes(itemName)
      );
      if (matchingItem) {
        onVoiceCommand('remove', matchingItem?.id);
        return;
      }
    }

    // Check for quantity updates with numbers
    const quantityMatch = command?.match(/(update|set|change) quantity to (\d+)/);
    if (quantityMatch) {
      const quantity = parseInt(quantityMatch?.[2]);
      if (cartItems?.length > 0) {
        onVoiceCommand('set-quantity', cartItems?.[0]?.id, quantity);
        return;
      }
    }

    // Execute predefined commands
    const action = commandActions?.[command];
    if (action) {
      action();
    } else {
      onVoiceCommand('unknown', command);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition?.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition?.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-2">
        {/* Voice Command Feedback */}
        {lastCommand && (
          <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-warm-lg max-w-xs">
            <p className="text-xs text-muted-foreground mb-1">Last command:</p>
            <p className="text-sm text-popover-foreground font-data">
              "{lastCommand}"
            </p>
          </div>
        )}

        {/* Voice Control Button */}
        <Button
          variant={isListening ? "default" : "outline"}
          size="icon"
          onClick={toggleListening}
          className={`w-14 h-14 rounded-full shadow-warm-lg ${
            isListening ? 'voice-pulse' : ''
          }`}
          title={isListening ? 'Stop listening' : 'Start voice commands'}
        >
          <Icon 
            name={isListening ? "MicOff" : "Mic"} 
            size={24}
            color={isListening ? 'var(--color-primary-foreground)' : 'currentColor'}
          />
        </Button>

        {/* Help Tooltip */}
        {isListening && (
          <div className="bg-popover border border-border rounded-lg p-4 shadow-warm-lg max-w-sm">
            <h4 className="font-heading font-semibold text-popover-foreground mb-2">
              Voice Commands
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• "Remove [item name]"</li>
              <li>• "Set quantity to [number]"</li>
              <li>• "Proceed to checkout"</li>
              <li>• "Continue shopping"</li>
              <li>• "Clear cart"</li>
              <li>• "Show total"</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceControl;