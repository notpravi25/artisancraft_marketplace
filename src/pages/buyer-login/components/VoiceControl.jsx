import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VoiceControl = ({ onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };
      
      recognitionInstance.onresult = (event) => {
        const current = event?.resultIndex;
        const transcriptResult = event?.results?.[current]?.[0]?.transcript;
        setTranscript(transcriptResult);
        
        if (event?.results?.[current]?.isFinal) {
          handleVoiceCommand(transcriptResult?.toLowerCase());
        }
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommand = (command) => {
    const commands = {
      'sign in': () => onVoiceCommand('submit_form'),
      'login': () => onVoiceCommand('submit_form'),
      'show password': () => onVoiceCommand('toggle_password'),
      'hide password': () => onVoiceCommand('toggle_password'),
      'remember me': () => onVoiceCommand('toggle_remember'),
      'forgot password': () => onVoiceCommand('forgot_password'),
      'register': () => onVoiceCommand('navigate_register'),
      'guest checkout': () => onVoiceCommand('guest_login'),
      'help': () => onVoiceCommand('show_help')
    };

    for (const [key, action] of Object.entries(commands)) {
      if (command?.includes(key)) {
        action();
        break;
      }
    }
    
    setTranscript('');
  };

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {transcript && (
          <div className="absolute bottom-16 right-0 bg-popover border border-border rounded-lg p-3 shadow-warm-lg min-w-48 max-w-64">
            <p className="text-xs text-muted-foreground mb-1">Listening...</p>
            <p className="text-sm text-foreground">{transcript}</p>
          </div>
        )}
        
        <button
          onClick={toggleListening}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-smooth shadow-warm-lg ${
            isListening 
              ? 'bg-primary text-primary-foreground voice-pulse' 
              : 'bg-card text-card-foreground hover:bg-muted'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice commands'}
        >
          <Icon 
            name={isListening ? "MicOff" : "Mic"} 
            size={24} 
          />
        </button>
        
        {isListening && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-pulse" />
        )}
      </div>
      
      {/* Voice commands help */}
      <div className="absolute bottom-16 right-0 bg-popover border border-border rounded-lg p-4 shadow-warm-lg w-64 opacity-0 hover:opacity-100 transition-smooth pointer-events-none hover:pointer-events-auto">
        <h4 className="text-sm font-medium text-foreground mb-2">Voice Commands</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• "Sign in" - Submit login form</li>
          <li>• "Show password" - Toggle password visibility</li>
          <li>• "Remember me" - Toggle remember checkbox</li>
          <li>• "Forgot password" - Go to password reset</li>
          <li>• "Register" - Go to registration</li>
          <li>• "Guest checkout" - Continue as guest</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceControl;