import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AudioPlayer } from './AudioPlayer';
import { StoryContent } from '@/data/lessonData';

interface StoryDisplayProps {
  story: StoryContent;
  onContinue: () => void;
}

export function StoryDisplay({ story, onContinue }: StoryDisplayProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={styles.content}
        entering={FadeInUp.duration(600)}
      >
        <Text style={styles.title}>{story.title}</Text>
        
        <View style={styles.audioSection}>
          <AudioPlayer 
            text={story.audioText}
            size="large"
            showText={true}
          />
          <Text style={styles.audioHint}>
            🎧 Listen to the story pronunciation
          </Text>
        </View>

        <Animated.View 
          style={styles.storyContainer}
          entering={FadeInDown.duration(600).delay(300)}
        >
          <Text style={styles.storyLabel}>📖 Story in Persian:</Text>
          <View style={styles.storyTextContainer}>
            <Text style={styles.storyText}>{story.text}</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.translationSection}
          entering={FadeInDown.duration(600).delay(600)}
        >
          <TouchableOpacity
            style={styles.translationButton}
            onPress={() => setShowTranslation(!showTranslation)}
          >
            <Text style={styles.translationButtonText}>
              {showTranslation ? '🙈 Hide Translation' : '👁️ Show Translation'}
            </Text>
          </TouchableOpacity>

          {showTranslation && story.translation && (
            <Animated.View 
              style={styles.translationContainer}
              entering={FadeInDown.duration(400)}
            >
              <Text style={styles.translationLabel}>🇺🇸 English Translation:</Text>
              <Text style={styles.translationText}>{story.translation}</Text>
            </Animated.View>
          )}
        </Animated.View>

        <Animated.View 
          style={styles.instructionSection}
          entering={FadeInDown.duration(600).delay(900)}
        >
          <View style={styles.instructionBox}>
            <Text style={styles.instructionTitle}>📚 What's Next?</Text>
            <Text style={styles.instructionText}>
              Now that you've read the story, let's test your understanding with some questions!
            </Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.buttonContainer}
          entering={FadeInDown.duration(600).delay(1200)}
        >
          <TouchableOpacity
            style={styles.continueButton}
            onPress={onContinue}
          >
            <Text style={styles.continueButtonText}>
              Start Questions 🚀
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 36,
  },
  audioSection: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  audioHint: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  storyContainer: {
    marginBottom: 20,
  },
  storyLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  storyTextContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  storyText: {
    fontSize: 20,
    lineHeight: 32,
    color: '#1F2937',
    textAlign: 'right', // Persian text reads right to left
    fontWeight: '500',
  },
  translationSection: {
    marginBottom: 20,
  },
  translationButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  translationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  translationContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  translationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 12,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#047857',
  },
  instructionSection: {
    marginBottom: 30,
  },
  instructionBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: '#78350F',
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});