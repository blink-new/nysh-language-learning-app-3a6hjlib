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
  audioUrl?: string;
  text?: string;
  autoPlay?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function AudioPlayer({ 
  audioUrl, 
  text, 
  autoPlay = false, 
  size = 'medium' 
}: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const pulseValue = useSharedValue(1);
  const waveValue = useSharedValue(0);

  useEffect(() => {
    if (autoPlay && audioUrl) {
      playAudio();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]);

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

      // For demo purposes, we'll simulate audio playback
      // In a real app, you would use the actual audioUrl
      if (audioUrl) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      } else {
        // Simulate audio playback for demo
        setIsPlaying(true);
        setTimeout(() => {
          setIsPlaying(false);
        }, 2000);
        return;
      }

    } catch (error) {
      console.log('Audio playback error:', error);
      // Fallback: show text pronunciation guide
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
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

      {text && (
        <Text style={styles.audioText}>{text}</Text>
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
  audioText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
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