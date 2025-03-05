
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceInputProps {
  onAnalyze: (transcription: string) => void;
}

export function VoiceInput({ onAnalyze }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const { toast } = useToast();
  const isRecognitionSupportedRef = useRef<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      isRecognitionSupportedRef.current = true;
      const SpeechRecognitionImpl = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognitionImpl();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        toast({
          description: "Listening...",
        });
      };

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const currentTranscript = event.results[current][0].transcript;
        
        // Update interim results
        if (!event.results[current].isFinal) {
          setTranscript(currentTranscript);
        } else {
          // Final result
          setTranscript(currentTranscript);
          onAnalyze(currentTranscript);
          setIsListening(false);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Error",
          description: "Failed to process voice input. Please try again.",
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        if (transcript) {
          // If we have a transcript but it wasn't processed as final
          onAnalyze(transcript);
          setTranscript('');
        }
      };

      recognitionRef.current = recognitionInstance;
    } else {
      isRecognitionSupportedRef.current = false;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        if (isListening) {
          recognitionRef.current.stop();
        }
      }
    };
  }, [toast, onAnalyze]);

  const toggleListening = () => {
    if (isListening && recognitionRef.current) {
      // If already listening, stop the recognition
      recognitionRef.current.stop();
      setTranscript('');
      setIsListening(false);
    } else {
      startListening();
    }
  };

  const startListening = async () => {
    if (!isRecognitionSupportedRef.current) {
      toast({
        title: "Error",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <Button
        variant={isListening ? "destructive" : "default"}
        size="icon"
        className="rounded-full"
        onClick={toggleListening}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
        title={isListening ? "Click to stop" : "Click to speak"}
      >
        {isListening ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
      
      {isListening && transcript && (
        <div className="absolute top-full right-0 mt-2 bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-md min-w-48 border border-border/50 z-10">
          <p className="text-xs text-muted-foreground mb-1">Listening:</p>
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  );
}
