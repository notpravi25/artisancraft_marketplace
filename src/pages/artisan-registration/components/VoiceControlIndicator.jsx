import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VoiceControlIndicator = ({ isActive, onToggle }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-IN';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event?.results)?.map(result => result?.[0])?.map(result => result?.transcript)?.join('');

        // Handle voice commands for form navigation
        handleVoiceCommand(transcript?.toLowerCase());
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

  const handleVoiceCommand = (command) => {
    // Basic voice commands for form navigation
    if (command?.includes('focus name') || command?.includes('name field')) {
      const nameInput = document.querySelector('input[name="fullName"]');
      if (nameInput) nameInput?.focus();
    } else if (command?.includes('focus email') || command?.includes('email field')) {
      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput) emailInput?.focus();
    } else if (command?.includes('focus phone') || command?.includes('phone field')) {
      const phoneInput = document.querySelector('input[name="phoneNumber"]');
      if (phoneInput) phoneInput?.focus();
    } else if (command?.includes('submit') || command?.includes('create account')) {
      const submitButton = document.querySelector('button[type="submit"]');
      if (submitButton) submitButton?.click();
    }
  };

  const toggleVoiceControl = () => {
    if (!recognition) {
      alert('Voice control is not supported in your browser');
      return;
    }

    if (isActive) {
      recognition?.stop();
      onToggle(false);
    } else {
      recognition?.start();
      onToggle(true);
    }
  };

  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-center space-y-2">
        {/* Voice Control Button */}
        <button
          onClick={toggleVoiceControl}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-warm-lg ${
            isActive
              ? 'bg-primary text-primary-foreground voice-pulse'
              : 'bg-card text-card-foreground hover:bg-muted'
          }`}
          title={isActive ? 'Stop voice control' : 'Start voice control'}
        >
          <Icon 
            name={isActive ? "MicOff" : "Mic"} 
            size={24} 
            className={isListening ? 'animate-pulse' : ''}
          />
        </button>

        {/* Status Indicator */}
        {isActive && (
          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-warm">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isListening ? 'bg-success animate-pulse' : 'bg-muted-foreground'
              }`} />
              <span className="text-xs font-caption text-card-foreground">
                {isListening ? 'Listening...' : 'Voice Ready'}
              </span>
            </div>
          </div>
        )}

        {/* Voice Commands Help */}
        {isActive && (
          <div className="bg-card border border-border rounded-lg p-3 shadow-warm max-w-xs">
            <h4 className="text-xs font-medium text-card-foreground mb-2">
              Voice Commands:
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>"Focus name" - Go to name field</li>
              <li>"Focus email" - Go to email field</li>
              <li>"Focus phone" - Go to phone field</li>
              <li>"Submit" - Create account</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceControlIndicator;