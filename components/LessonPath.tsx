import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { getAllLessons, Lesson } from '@/data/lessonData';

export function LessonPath() {
  const lessons = getAllLessons();

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return '✅';
    
    switch (type) {
      case 'alphabet':
        return '🔤';
      case 'regular':
        return '📚';
      case 'story':
        return '📖';
      case 'grammar':
        return '📝';
      case 'culture':
        return '🏛️';
      default:
        return '📖';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1':
        return '#10B981';
      case 'A2':
        return '#F59E0B';
      case 'B1':
        return '#EF4444';
      case 'B2':
        return '#8B5CF6';
      case 'C1':
        return '#3B82F6';
      case 'C2':
        return '#6366F1';
      default:
        return '#6B7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alphabet':
        return '#10B981';
      case 'story':
        return '#F59E0B';
      case 'grammar':
        return '#8B5CF6';
      case 'culture':
        return '#EF4444';
      default:
        return '#4F46E5';
    }
  };

  const handleLessonPress = (lesson: Lesson) => {
    // For demo, all lessons are unlocked
    router.push(`/lesson/${lesson.id}`);
  };

  const getQuestionCount = (lesson: Lesson) => {
    return lesson.type === 'story' ? '5 questions' : '10 questions';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Learning Path</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {lessons.map((lesson, index) => (
          <Animated.View
            key={lesson.id}
            entering={FadeInDown.duration(600).delay(index * 100)}
          >
            <TouchableOpacity
              style={[
                styles.lessonCard,
                { borderLeftColor: getTypeColor(lesson.type) }
              ]}
              onPress={() => handleLessonPress(lesson)}
            >
              <View style={styles.lessonHeader}>
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: getTypeColor(lesson.type) + '20' }
                ]}>
                  <Text style={styles.lessonIcon}>
                    {getLessonIcon(lesson.type, false)}
                  </Text>
                </View>
                
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonMeta}>
                    {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)} • {getQuestionCount(lesson)}
                  </Text>
                  {lesson.description && (
                    <Text style={styles.lessonDescription}>{lesson.description}</Text>
                  )}
                </View>

                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(lesson.level) }]}>
                  <Text style={styles.levelText}>{lesson.level}</Text>
                </View>
              </View>

              {lesson.type === 'alphabet' && (
                <View style={styles.alphabetBanner}>
                  <Text style={styles.alphabetBannerText}>🔤 Alphabet Learning • Letters & Sounds</Text>
                </View>
              )}

              {lesson.type === 'story' && (
                <View style={styles.storyBanner}>
                  <Text style={styles.storyBannerText}>📚 Cultural Story • Read & Answer Questions</Text>
                </View>
              )}

              {lesson.type === 'culture' && (
                <View style={styles.cultureBanner}>
                  <Text style={styles.cultureBannerText}>🏛️ Cultural Learning • Traditions & History</Text>
                </View>
              )}

              {lesson.culturalNote && (
                <View style={styles.culturalPreview}>
                  <Text style={styles.culturalPreviewTitle}>💡 You'll learn:</Text>
                  <Text style={styles.culturalPreviewText} numberOfLines={2}>
                    {lesson.culturalNote}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {index < lessons.length - 1 && (
              <View style={styles.pathConnector}>
                <View style={styles.pathLine} />
              </View>
            )}
          </Animated.View>
        ))}

        {/* Coming Soon Lessons */}
        <Animated.View entering={FadeInDown.duration(600).delay(lessons.length * 100)}>
          <View style={styles.comingSoonCard}>
            <View style={styles.lessonHeader}>
              <View style={styles.iconContainer}>
                <Text style={styles.lessonIcon}>🔮</Text>
              </View>
              
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>More Lessons Coming Soon!</Text>
                <Text style={styles.lessonMeta}>Advanced grammar, poetry, and more stories</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonIcon: {
    fontSize: 24,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  lessonMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  alphabetBanner: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  alphabetBannerText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  storyBanner: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  storyBannerText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  cultureBanner: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  cultureBannerText: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  culturalPreview: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  culturalPreviewTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 4,
  },
  culturalPreviewText: {
    fontSize: 11,
    color: '#047857',
    lineHeight: 16,
  },
  pathConnector: {
    alignItems: 'center',
    height: 20,
  },
  pathLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E7EB',
  },
  comingSoonCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
});