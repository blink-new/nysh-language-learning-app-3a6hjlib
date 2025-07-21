import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface UserProgressProps {
  stats: {
    xp: number;
    level: number;
    streak: number;
    badges: string[];
  };
}

export function UserProgress({ stats }: UserProgressProps) {
  const xpForNextLevel = stats.level * 300;
  const currentLevelXP = stats.xp % 300;
  const progressPercentage = (currentLevelXP / 300) * 100;

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeInDown.duration(600).delay(200)}
    >
      <View style={styles.levelSection}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level {stats.level}</Text>
        </View>
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>{stats.xp} XP</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.nextLevelText}>{300 - currentLevelXP} XP to Level {stats.level + 1}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.streak}</Text>
          <Text style={styles.statLabel}>🔥 Day Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.badges.length}</Text>
          <Text style={styles.statLabel}>🏆 Badges</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  levelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelBadge: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 16,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  xpContainer: {
    flex: 1,
  },
  xpText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 4,
  },
  nextLevelText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});