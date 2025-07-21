import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AudioPlayer } from './AudioPlayer';

interface AlphabetCardProps {
  letter: string;
  sound: string;
  explanation: string;
  onPress?: () => void;
  showAudio?: boolean;
}

export function AlphabetCard({ 
  letter, 
  sound, 
  explanation, 
  onPress,
  showAudio = true 
}: AlphabetCardProps) {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeInDown.duration(600)}
    >
      <TouchableOpacity 
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.letterSection}>
          <Text style={styles.letter}>{letter}</Text>
          <Text style={styles.soundLabel}>Sound:</Text>
          <Text style={styles.sound}>{sound}</Text>
        </View>

        {showAudio && (
          <View style={styles.audioSection}>
            <AudioPlayer 
              text={letter}
              size="medium"
              showText={false}
            />
          </View>
        )}

        <View style={styles.explanationSection}>
          <Text style={styles.explanation}>{explanation}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#4F46E5',
  },
  letterSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  letter: {
    fontSize: 80,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 8,
    textAlign: 'center',
  },
  soundLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  sound: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F59E0B',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  audioSection: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
  },
  explanationSection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  explanation: {
    fontSize: 16,
    color: '#047857',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
});