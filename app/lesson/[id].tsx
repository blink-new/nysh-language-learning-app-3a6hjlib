import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LionMascot } from '@/components/LionMascot';
import { HeartsSystem } from '@/components/HeartsSystem';
import { SentenceBuilder } from '@/components/SentenceBuilder';
import { AudioPlayer } from '@/components/AudioPlayer';
import { getLesson, Question } from '@/data/lessonData';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [lionMessage, setLionMessage] = useState("Let's start this lesson! 🦁");
  const [lionMood, setLionMood] = useState<'happy' | 'encouraging' | 'celebrating' | 'questioning' | 'sad'>('questioning');
  const [gameOver, setGameOver] = useState(false);

  const lesson = getLesson(id as string);
  const currentQuestion = lesson?.questions[currentQuestionIndex];
  const maxQuestions = lesson?.type === 'story' ? 5 : 10;

  useEffect(() => {
    if (currentQuestion) {
      setLionMessage(`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`);
      setLionMood('questioning');
    }
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    if (hearts === 0) {
      setGameOver(true);
      setLionMessage("Don't give up! Practice makes perfect! 💪");
      setLionMood('encouraging');
    }
  }, [hearts]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Lesson not found!</Text>
      </SafeAreaView>
    );
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSentenceComplete = (isCorrect: boolean, builtSentence: string) => {
    setSelectedAnswer(builtSentence);
    handleSubmitAnswer(isCorrect);
  };

  const handleSubmitAnswer = (isCorrectOverride?: boolean) => {
    if (!selectedAnswer || !currentQuestion) return;

    const isCorrect = isCorrectOverride !== undefined ? 
      isCorrectOverride : 
      selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      setLionMessage("Excellent! 🎉 " + currentQuestion.explanation);
      setLionMood('celebrating');
    } else {
      setHearts(hearts - 1);
      setLionMessage("Not quite right, but keep trying! 💪 " + currentQuestion.explanation);
      setLionMood(hearts <= 1 ? 'sad' : 'encouraging');
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < lesson.questions.length - 1 && currentQuestionIndex < maxQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Lesson complete - navigate to completion screen
      const xpEarned = score * 25; // 25 XP per correct answer
      const badge = score === Math.min(lesson.questions.length, maxQuestions) ? 'perfect-score' : null;
      
      router.push({
        pathname: '/lesson-complete',
        params: {
          lessonTitle: lesson.title,
          score: score.toString(),
          totalQuestions: Math.min(lesson.questions.length, maxQuestions).toString(),
          xpEarned: xpEarned.toString(),
          badge: badge || '',
        }
      });
    }
  };

  const handlePractice = () => {
    // Reset hearts and continue
    setHearts(5);
    setGameOver(false);
    setLionMessage("Great! You've earned more hearts. Let's continue! 🦁");
    setLionMood('happy');
  };

  const progress = ((currentQuestionIndex + 1) / Math.min(lesson.questions.length, maxQuestions)) * 100;

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'sentence-building':
        return (
          <SentenceBuilder
            words={currentQuestion.words || []}
            correctOrder={currentQuestion.correctOrder || []}
            onComplete={handleSentenceComplete}
            disabled={showExplanation}
          />
        );

      case 'audio-match':
      case 'listening':
        return (
          <View style={styles.audioQuestionContainer}>
            <AudioPlayer
              audioUrl={currentQuestion.audioUrl}
              text="🎧 Listen carefully"
              size="large"
              autoPlay={false}
            />
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.selectedOption,
                    showExplanation && option === currentQuestion.correctAnswer && styles.correctOption,
                    showExplanation && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.incorrectOption,
                  ]}
                  onPress={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                >
                  <Text style={[
                    styles.optionText,
                    selectedAnswer === option && styles.selectedOptionText,
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.standardQuestionContainer}>
            {currentQuestion.audioUrl && (
              <AudioPlayer
                audioUrl={currentQuestion.audioUrl}
                text="🔊 Listen to pronunciation"
                size="medium"
                autoPlay={false}
              />
            )}
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.selectedOption,
                    showExplanation && option === currentQuestion.correctAnswer && styles.correctOption,
                    showExplanation && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.incorrectOption,
                  ]}
                  onPress={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                >
                  <Text style={[
                    styles.optionText,
                    selectedAnswer === option && styles.selectedOptionText,
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
    }
  };

  if (gameOver) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.gameOverContainer}>
          <HeartsSystem
            hearts={hearts}
            maxHearts={5}
            showPracticeButton={true}
            onPracticePress={handlePractice}
          />
          
          <LionMascot 
            mood="encouraging"
            message="Don't worry! Every mistake is a step towards mastery. Practice to earn more hearts! 💪"
            size="large"
          />

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.homeButtonText}>Return Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={styles.header}
          entering={FadeInUp.duration(600)}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonType}>
              {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)} • {lesson.level}
            </Text>
          </View>
          
          <HeartsSystem hearts={hearts} maxHearts={5} />
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1} / {Math.min(lesson.questions.length, maxQuestions)}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.content}>
          <LionMascot 
            mood={lionMood}
            message={lionMessage}
            size="large"
          />

          {currentQuestion && (
            <Animated.View 
              style={styles.questionContainer}
              entering={FadeInDown.duration(600)}
            >
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
              
              {renderQuestion()}

              <View style={styles.buttonContainer}>
                {!showExplanation && currentQuestion.type !== 'sentence-building' ? (
                  <TouchableOpacity
                    style={[styles.submitButton, !selectedAnswer && styles.disabledButton]}
                    onPress={() => handleSubmitAnswer()}
                    disabled={!selectedAnswer}
                  >
                    <Text style={styles.submitButtonText}>Check Answer</Text>
                  </TouchableOpacity>
                ) : showExplanation ? (
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNextQuestion}
                  >
                    <Text style={styles.nextButtonText}>
                      {currentQuestionIndex < Math.min(lesson.questions.length, maxQuestions) - 1 ? 'Next Question' : 'Complete Lesson'}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </Animated.View>
          )}

          {lesson.culturalNote && currentQuestionIndex === 0 && (
            <Animated.View 
              style={styles.culturalNote}
              entering={FadeInDown.duration(600).delay(300)}
            >
              <Text style={styles.culturalNoteTitle}>💡 Cultural Note</Text>
              <Text style={styles.culturalNoteText}>{lesson.culturalNote}</Text>
            </Animated.View>
          )}
        </View>
      </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
  },
  lessonInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  lessonType: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  questionContainer: {
    marginTop: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  audioQuestionContainer: {
    alignItems: 'center',
  },
  standardQuestionContainer: {
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedOption: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  correctOption: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  incorrectOption: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionText: {
    fontSize: 18,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 30,
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  culturalNote: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  culturalNoteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  culturalNoteText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  homeButton: {
    backgroundColor: '#6B7280',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 20,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 100,
  },
});