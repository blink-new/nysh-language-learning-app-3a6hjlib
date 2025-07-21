import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

interface Word {
  id: string;
  text: string;
  originalIndex: number;
}

interface SentenceBuilderProps {
  words: string[];
  correctOrder: number[];
  onComplete: (isCorrect: boolean, builtSentence: string) => void;
  disabled?: boolean;
}

export function SentenceBuilder({ 
  words, 
  correctOrder, 
  onComplete, 
  disabled = false 
}: SentenceBuilderProps) {
  const [availableWords, setAvailableWords] = useState<Word[]>(
    words.map((word, index) => ({
      id: `word-${index}`,
      text: word,
      originalIndex: index
    }))
  );
  
  const [sentenceWords, setSentenceWords] = useState<Word[]>([]);
  const [draggedWord, setDraggedWord] = useState<Word | null>(null);

  const checkAnswer = () => {
    if (sentenceWords.length !== correctOrder.length) return;
    
    const builtOrder = sentenceWords.map(word => word.originalIndex);
    const isCorrect = JSON.stringify(builtOrder) === JSON.stringify(correctOrder);
    const builtSentence = sentenceWords.map(word => word.text).join(' ');
    
    onComplete(isCorrect, builtSentence);
  };

  const addWordToSentence = (word: Word) => {
    if (disabled) return;
    
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
    setSentenceWords(prev => [...prev, word]);
  };

  const removeWordFromSentence = (word: Word) => {
    if (disabled) return;
    
    setSentenceWords(prev => prev.filter(w => w.id !== word.id));
    setAvailableWords(prev => [...prev, word].sort((a, b) => a.originalIndex - b.originalIndex));
  };

  const reset = () => {
    setAvailableWords(
      words.map((word, index) => ({
        id: `word-${index}`,
        text: word,
        originalIndex: index
      }))
    );
    setSentenceWords([]);
  };

  React.useEffect(() => {
    if (sentenceWords.length === correctOrder.length) {
      setTimeout(checkAnswer, 500);
    }
  }, [sentenceWords]);

  const WordChip = ({ word, isInSentence }: { word: Word; isInSentence: boolean }) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    const handlePress = () => {
      scale.value = withSequence(
        withSpring(0.9, { damping: 15 }),
        withSpring(1, { damping: 15 })
      );

      if (isInSentence) {
        removeWordFromSentence(word);
      } else {
        addWordToSentence(word);
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Animated.View style={[
          styles.wordChip,
          isInSentence ? styles.sentenceWordChip : styles.availableWordChip,
          disabled && styles.disabledChip,
          animatedStyle
        ]}>
          <Text style={[
            styles.wordText,
            isInSentence ? styles.sentenceWordText : styles.availableWordText,
            disabled && styles.disabledText
          ]}>
            {word.text}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Sentence Building Area */}
      <View style={styles.sentenceArea}>
        <Text style={styles.sectionTitle}>Build your sentence:</Text>
        <View style={styles.sentenceContainer}>
          {sentenceWords.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Tap words below to build your sentence</Text>
            </View>
          ) : (
            <View style={styles.sentenceWords}>
              {sentenceWords.map((word, index) => (
                <View key={word.id} style={styles.sentenceWordWrapper}>
                  <WordChip word={word} isInSentence={true} />
                  {index < sentenceWords.length - 1 && (
                    <Text style={styles.spacer}> </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Available Words */}
      <View style={styles.wordsArea}>
        <Text style={styles.sectionTitle}>Available words:</Text>
        <View style={styles.availableWords}>
          {availableWords.map((word) => (
            <WordChip key={word.id} word={word} isInSentence={false} />
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.resetButton, disabled && styles.disabledButton]}
          onPress={reset}
          disabled={disabled}
        >
          <Text style={[styles.resetButtonText, disabled && styles.disabledText]}>
            Reset
          </Text>
        </TouchableOpacity>

        {sentenceWords.length === correctOrder.length && (
          <TouchableOpacity
            style={[styles.checkButton, disabled && styles.disabledButton]}
            onPress={checkAnswer}
            disabled={disabled}
          >
            <Text style={[styles.checkButtonText, disabled && styles.disabledText]}>
              Check Answer
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  sentenceArea: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  sentenceContainer: {
    minHeight: 80,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    padding: 16,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  sentenceWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sentenceWordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spacer: {
    fontSize: 16,
    color: '#6B7280',
  },
  wordsArea: {
    marginBottom: 20,
  },
  availableWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  availableWordChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  sentenceWordChip: {
    backgroundColor: '#4F46E5',
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  disabledChip: {
    opacity: 0.5,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '500',
  },
  availableWordText: {
    color: '#4F46E5',
  },
  sentenceWordText: {
    color: '#FFFFFF',
  },
  disabledText: {
    opacity: 0.5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  resetButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  checkButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
});