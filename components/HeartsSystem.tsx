import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence,
  withTiming,
  withSpring,
  runOnJS
} from 'react-native-reanimated';

interface HeartsSystemProps {
  hearts: number;
  maxHearts: number;
  onHeartLost?: () => void;
  onPracticePress?: () => void;
  showPracticeButton?: boolean;
}

export function HeartsSystem({ 
  hearts, 
  maxHearts, 
  onHeartLost, 
  onPracticePress,
  showPracticeButton = false 
}: HeartsSystemProps) {
  const shakeValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  const triggerHeartLoss = () => {
    // Shake animation when heart is lost
    shakeValue.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );

    // Scale animation
    scaleValue.value = withSequence(
      withSpring(1.2, { damping: 10 }),
      withSpring(1, { damping: 15 })
    );

    if (onHeartLost) {
      setTimeout(() => runOnJS(onHeartLost)(), 250);
    }
  };

  React.useEffect(() => {
    if (hearts < maxHearts) {
      triggerHeartLoss();
    }
  }, [hearts]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeValue.value },
      { scale: scaleValue.value }
    ],
  }));

  const renderHearts = () => {
    const heartElements = [];
    
    for (let i = 0; i < maxHearts; i++) {
      const isFilled = i < hearts;
      heartElements.push(
        <Animated.View 
          key={i} 
          style={[
            styles.heartContainer,
            i === hearts && animatedStyle // Only animate the heart that was just lost
          ]}
        >
          <Text style={[
            styles.heart,
            isFilled ? styles.filledHeart : styles.emptyHeart
          ]}>
            {isFilled ? '❤️' : '🤍'}
          </Text>
        </Animated.View>
      );
    }
    
    return heartElements;
  };

  if (hearts === 0) {
    return (
      <View style={styles.gameOverContainer}>
        <Animated.View style={[styles.heartsRow, animatedStyle]}>
          {renderHearts()}
        </Animated.View>
        
        <View style={styles.gameOverContent}>
          <Text style={styles.gameOverTitle}>Out of Hearts! 💔</Text>
          <Text style={styles.gameOverText}>
            Don't worry! Practice to earn more hearts and continue learning.
          </Text>
          
          {showPracticeButton && (
            <TouchableOpacity 
              style={styles.practiceButton}
              onPress={onPracticePress}
            >
              <Text style={styles.practiceButtonText}>Practice to Earn Hearts</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.heartsRow, animatedStyle]}>
        {renderHearts()}
      </Animated.View>
      
      <Text style={styles.heartsText}>
        {hearts} / {maxHearts} Hearts
      </Text>
      
      {hearts <= 2 && hearts > 0 && (
        <Text style={styles.warningText}>
          ⚠️ Be careful! You're running low on hearts
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  heartsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  heartContainer: {
    marginHorizontal: 4,
  },
  heart: {
    fontSize: 24,
  },
  filledHeart: {
    opacity: 1,
  },
  emptyHeart: {
    opacity: 0.3,
  },
  heartsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  warningText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
  gameOverContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  gameOverContent: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  gameOverTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  practiceButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  practiceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});