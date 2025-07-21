import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LionMascot } from '@/components/LionMascot';
import { LessonPath } from '@/components/LessonPath';
import { BottomTabs } from '@/components/BottomTabs';
import { UserProgress } from '@/components/UserProgress';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [userStats, setUserStats] = useState({
    xp: 1250,
    level: 5,
    streak: 7,
    badges: ['first-lesson', 'week-streak', 'grammar-master']
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <UserProgress stats={userStats} />
            <LessonPath />
          </ScrollView>
        );
      case 'grammar':
        return (
          <View style={styles.content}>
            <Text style={styles.comingSoon}>Grammar Reference Coming Soon!</Text>
          </View>
        );
      case 'streak':
        return (
          <View style={styles.content}>
            <Text style={styles.comingSoon}>Streak Tracker Coming Soon!</Text>
          </View>
        );
      case 'account':
        return (
          <View style={styles.content}>
            <Text style={styles.comingSoon}>Account Settings Coming Soon!</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={styles.header}
        entering={FadeInUp.duration(600)}
      >
        <Text style={styles.title}>NYSH</Text>
        <Text style={styles.subtitle}>Learn Farsi & More</Text>
      </Animated.View>

      {renderContent()}

      <BottomTabs activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  comingSoon: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 100,
  },
});