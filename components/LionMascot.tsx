import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  Easing
} from 'react-native-reanimated';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

interface LionMascotProps {
  mood?: 'happy' | 'encouraging' | 'celebrating' | 'questioning' | 'sad';
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LionMascot({ 
  mood = 'happy', 
  message = "Let's learn together!", 
  size = 'medium' 
}: LionMascotProps) {
  const bounceValue = useSharedValue(0);
  const glassesShine = useSharedValue(0);
  const blinkValue = useSharedValue(1);

  React.useEffect(() => {
    // Gentle bounce animation
    bounceValue.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );

    // Glasses shine effect
    glassesShine.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 3000 }),
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      true
    );

    // Blinking animation
    blinkValue.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0.1, { duration: 150 }),
        withTiming(1, { duration: 150 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value * -8 }],
  }));

  const glassesStyle = useAnimatedStyle(() => ({
    opacity: 0.8 + (glassesShine.value * 0.2),
  }));

  const eyesStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: blinkValue.value }],
  }));

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 70, height: 70, svgSize: 60 };
      case 'large':
        return { width: 140, height: 140, svgSize: 120 };
      default:
        return { width: 100, height: 100, svgSize: 80 };
    }
  };

  const sizeStyles = getSizeStyles();

  const getMoodColor = () => {
    switch (mood) {
      case 'encouraging':
        return '#F59E0B';
      case 'celebrating':
        return '#10B981';
      case 'questioning':
        return '#6366F1';
      case 'sad':
        return '#EF4444';
      default:
        return '#F59E0B';
    }
  };

  const LionSVG = () => (
    <Svg width={sizeStyles.svgSize} height={sizeStyles.svgSize} viewBox="0 0 100 100">
      {/* Lion face base */}
      <Circle cx="50" cy="50" r="35" fill="#D97706" stroke="#92400E" strokeWidth="2"/>
      
      {/* Mane */}
      <Circle cx="35" cy="35" r="12" fill="#B45309" opacity="0.8"/>
      <Circle cx="65" cy="35" r="12" fill="#B45309" opacity="0.8"/>
      <Circle cx="30" cy="50" r="10" fill="#B45309" opacity="0.8"/>
      <Circle cx="70" cy="50" r="10" fill="#B45309" opacity="0.8"/>
      <Circle cx="35" cy="65" r="10" fill="#B45309" opacity="0.8"/>
      <Circle cx="65" cy="65" r="10" fill="#B45309" opacity="0.8"/>
      
      {/* Inner face */}
      <Circle cx="50" cy="50" r="28" fill="#F59E0B"/>
      
      {/* Eyes */}
      <Animated.View style={eyesStyle}>
        <Svg width={sizeStyles.svgSize} height={sizeStyles.svgSize} viewBox="0 0 100 100">
          <Ellipse cx="42" cy="45" rx="4" ry="6" fill="#1F2937"/>
          <Ellipse cx="58" cy="45" rx="4" ry="6" fill="#1F2937"/>
          <Circle cx="43" cy="43" r="1.5" fill="#FFFFFF"/>
          <Circle cx="59" cy="43" r="1.5" fill="#FFFFFF"/>
        </Svg>
      </Animated.View>
      
      {/* Nose */}
      <Ellipse cx="50" cy="52" rx="3" ry="2" fill="#92400E"/>
      
      {/* Mouth */}
      <Path 
        d={mood === 'sad' ? "M 45 58 Q 50 55 55 58" : "M 45 58 Q 50 62 55 58"} 
        stroke="#92400E" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Whiskers */}
      <Path d="M 30 48 L 38 50" stroke="#92400E" strokeWidth="1.5"/>
      <Path d="M 30 52 L 38 52" stroke="#92400E" strokeWidth="1.5"/>
      <Path d="M 62 50 L 70 48" stroke="#92400E" strokeWidth="1.5"/>
      <Path d="M 62 52 L 70 52" stroke="#92400E" strokeWidth="1.5"/>
    </Svg>
  );

  const GlassesSVG = () => (
    <Animated.View style={[styles.glassesContainer, glassesStyle]}>
      <Svg width={sizeStyles.svgSize} height={sizeStyles.svgSize} viewBox="0 0 100 100">
        {/* Glasses frame */}
        <Circle cx="42" cy="45" r="12" fill="none" stroke="#374151" strokeWidth="2"/>
        <Circle cx="58" cy="45" r="12" fill="none" stroke="#374151" strokeWidth="2"/>
        
        {/* Bridge */}
        <Path d="M 54 45 L 46 45" stroke="#374151" strokeWidth="2"/>
        
        {/* Lens reflection */}
        <Circle cx="42" cy="45" r="10" fill="rgba(255,255,255,0.1)"/>
        <Circle cx="58" cy="45" r="10" fill="rgba(255,255,255,0.1)"/>
        
        {/* Lens shine */}
        <Ellipse cx="38" cy="41" rx="3" ry="5" fill="rgba(255,255,255,0.4)"/>
        <Ellipse cx="54" cy="41" rx="3" ry="5" fill="rgba(255,255,255,0.4)"/>
      </Svg>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.lionContainer, animatedStyle]}>
        <View style={[
          styles.lion, 
          { 
            width: sizeStyles.width, 
            height: sizeStyles.height,
            borderColor: getMoodColor(),
            shadowColor: getMoodColor(),
          }
        ]}>
          <LionSVG />
          <GlassesSVG />
        </View>
      </Animated.View>
      
      {message && (
        <View style={styles.speechBubble}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.speechTail} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  lionContainer: {
    position: 'relative',
  },
  lion: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 50,
    borderWidth: 3,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  glassesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginTop: 15,
    maxWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  message: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
  },
  speechTail: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
  },
});