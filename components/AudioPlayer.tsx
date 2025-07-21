import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat,
  withTiming,
  withSequence
} from 'react-native-reanimated';

interface AudioPlayerProps {
  text: string;
  audioUrl?: string;
  autoPlay?: boolean;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export function AudioPlayer({ 
  text,
  audioUrl, 
  autoPlay = false, 
  size = 'medium',
  showText = true
}: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const pulseValue = useSharedValue(1);
  const waveValue = useSharedValue(0);

  useEffect(() => {
    // Configure audio mode for better playback
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    if (autoPlay && text) {
      playAudio();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [text]);

  useEffect(() => {
    if (isPlaying) {
      // Pulse animation while playing
      pulseValue.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );

      // Wave animation
      waveValue.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      );
    } else {
      pulseValue.value = withTiming(1, { duration: 300 });
      waveValue.value = withTiming(0, { duration: 300 });
    }
  }, [isPlaying]);

  const playAudio = async () => {
    try {
      setIsLoading(true);
      
      if (sound) {
        await sound.unloadAsync();
      }

      // Use text-to-speech for Persian text
      // For now, we'll simulate audio playback with visual feedback
      // In production, you would integrate with a TTS service or use pre-recorded audio
      
      setIsPlaying(true);
      
      // Simulate audio duration based on text length
      const duration = Math.max(1000, text.length * 100); // Minimum 1 second
      
      setTimeout(() => {
        setIsPlaying(false);
      }, duration);

    } catch (error) {
      console.log('Audio playback error:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 40, height: 40, iconSize: 16 };
      case 'large':
        return { width: 80, height: 80, iconSize: 32 };
      default:
        return { width: 60, height: 60, iconSize: 24 };
    }
  };

  const sizeStyles = getSizeStyles();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  const waveStyle = useAnimatedStyle(() => ({
    opacity: waveValue.value * 0.6,
    transform: [{ scale: 1 + waveValue.value * 0.3 }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleAudio}
        disabled={isLoading}
        style={styles.audioButton}
      >
        <Animated.View style={[
          styles.audioButtonInner,
          {
            width: sizeStyles.width,
            height: sizeStyles.height,
          },
          animatedStyle
        ]}>
          {/* Wave effect background */}
          {isPlaying && (
            <Animated.View style={[
              styles.waveEffect,
              {
                width: sizeStyles.width * 1.5,
                height: sizeStyles.height * 1.5,
              },
              waveStyle
            ]} />
          )}
          
          {/* Play/Pause Icon */}
          <Text style={[
            styles.audioIcon,
            { fontSize: sizeStyles.iconSize }
          ]}>
            {isLoading ? '⏳' : isPlaying ? '⏸️' : '🔊'}
          </Text>
        </Animated.View>
      </TouchableOpacity>

      {showText && text && (
        <View style={styles.textContainer}>
          <Text style={styles.audioText}>{text}</Text>
          <Text style={styles.pronunciationHint}>
            Tap to hear pronunciation
          </Text>
        </View>
      )}

      {isPlaying && (
        <View style={styles.playingIndicator}>
          <Text style={styles.playingText}>🎵 Playing...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  audioButton: {
    position: 'relative',
  },
  audioButtonInner: {
    backgroundColor: '#4F46E5',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  waveEffect: {
    position: 'absolute',
    backgroundColor: '#4F46E5',
    borderRadius: 50,
    zIndex: -1,
  },
  audioIcon: {
    color: '#FFFFFF',
  },
  textContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  audioText: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  pronunciationHint: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  playingIndicator: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
  },
  playingText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
});