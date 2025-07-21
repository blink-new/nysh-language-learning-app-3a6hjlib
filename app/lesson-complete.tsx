import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { LionMascot } from '@/components/LionMascot';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const availableBadges: { [key: string]: Badge } = {
  'perfect-score': {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Got every question right!',
    icon: '🏆'
  },
  'first-lesson': {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Completed your first lesson',
    icon: '🌟'
  },
  'grammar-master': {
    id: 'grammar-master',
    name: 'Grammar Master',
    description: 'Completed a grammar lesson',
    icon: '📚'
  }
};

export default function LessonCompleteScreen() {
  const params = useLocalSearchParams();
  const { lessonTitle, score, totalQuestions, xpEarned, badge } = params;
  
  const [showXP, setShowXP] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [currentXP, setCurrentXP] = useState(0);
  
  const xpScale = useSharedValue(0);
  const badgeScale = useSharedValue(0);
  const confettiOpacity = useSharedValue(0);
  
  const earnedBadge = badge ? availableBadges[badge as string] : null;
  const finalXP = parseInt(xpEarned as string) || 0;
  const scorePercentage = (parseInt(score as string) / parseInt(totalQuestions as string)) * 100;

  useEffect(() => {
    // Animate XP counter
    setTimeout(() => {
      setShowXP(true);
      xpScale.value = withSpring(1, { damping: 15, stiffness: 150 });
      
      // Animate XP number counting up
      const duration = 1500;
      const steps = 30;
      const increment = finalXP / steps;
      
      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          setCurrentXP(Math.round(increment * i));
        }, (duration / steps) * i);
      }
    }, 500);

    // Show badge after XP animation
    if (earnedBadge) {
      setTimeout(() => {
        setShowBadge(true);
        badgeScale.value = withSequence(
          withSpring(1.2, { damping: 10, stiffness: 200 }),
          withSpring(1, { damping: 15, stiffness: 150 })
        );
        
        // Confetti effect
        confettiOpacity.value = withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0, { duration: 2000 })
        );
      }, 2000);
    }
  }, []);

  const xpAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: xpScale.value }],
  }));

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const confettiAnimatedStyle = useAnimatedStyle(() => ({
    opacity: confettiOpacity.value,
  }));

  const getPerformanceMessage = () => {
    if (scorePercentage === 100) {
      return "Perfect! You're a star! 🌟";
    } else if (scorePercentage >= 80) {
      return "Excellent work! 🎉";
    } else if (scorePercentage >= 60) {
      return "Good job! Keep it up! 💪";
    } else {
      return "Nice try! Practice makes perfect! 📚";
    }
  };

  const getLionMood = () => {
    if (scorePercentage >= 80) return 'celebrating';
    if (scorePercentage >= 60) return 'encouraging';
    return 'happy';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Confetti Effect */}
      <Animated.View style={[styles.confetti, confettiAnimatedStyle]}>
        <Text style={styles.confettiText}>🎉 ✨ 🎊 ⭐ 🏆 ✨ 🎉</Text>
      </Animated.View>

      <Animated.View 
        style={styles.header}
        entering={FadeInUp.duration(600)}
      >
        <Text style={styles.title}>Lesson Complete!</Text>
        <Text style={styles.lessonTitle}>{lessonTitle}</Text>
      </Animated.View>

      <View style={styles.content}>
        <LionMascot 
          mood={getLionMood()}
          message={getPerformanceMessage()}
          size="large"
        />

        <Animated.View 
          style={styles.resultsContainer}
          entering={FadeInDown.duration(600).delay(300)}
        >
          <View style={styles.scoreCard}>
            <Text style={styles.scoreTitle}>Your Score</Text>
            <Text style={styles.scoreText}>
              {score} / {totalQuestions}
            </Text>
            <Text style={styles.percentageText}>
              {Math.round(scorePercentage)}%
            </Text>
          </View>

          {showXP && (
            <Animated.View style={[styles.xpCard, xpAnimatedStyle]}>
              <Text style={styles.xpTitle}>XP Earned</Text>
              <Text style={styles.xpText}>+{currentXP}</Text>
            </Animated.View>
          )}

          {showBadge && earnedBadge && (
            <Animated.View style={[styles.badgeCard, badgeAnimatedStyle]}>
              <Text style={styles.badgeTitle}>New Badge Unlocked!</Text>
              <Text style={styles.badgeIcon}>{earnedBadge.icon}</Text>
              <Text style={styles.badgeName}>{earnedBadge.name}</Text>
              <Text style={styles.badgeDescription}>{earnedBadge.description}</Text>
            </Animated.View>
          )}
        </Animated.View>
      </View>

      <Animated.View 
        style={styles.buttonContainer}
        entering={FadeInDown.duration(600).delay(600)}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.continueButtonText}>Continue Learning</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => router.back()}
        >
          <Text style={styles.reviewButtonText}>Review Lesson</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  confetti: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  confettiText: {
    fontSize: 30,
    letterSpacing: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsContainer: {
    marginTop: 20,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  percentageText: {
    fontSize: 18,
    color: '#4F46E5',
    fontWeight: '600',
  },
  xpCard: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  xpTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  xpText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  badgeCard: {
    backgroundColor: '#10B981',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    fontWeight: '500',
  },
  badgeIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  continueButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  reviewButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  reviewButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
});