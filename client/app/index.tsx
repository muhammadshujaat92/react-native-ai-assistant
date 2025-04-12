import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, ViewToken, ActivityIndicator, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { hasSeenOnboarding, setOnboardingSeen } from '../utils/storage';
import { LinearGradient } from 'expo-linear-gradient';

const botImage = require("@/assets/images/onboardBot.png");
const botChatImage = require("@/assets/images/botchat.png");

const { width } = Dimensions.get('window');

type Slide = {
  image: ImageSourcePropType | undefined;
  key: string;
  title: string | ReactNode;
  description: string;
};

const slides: Slide[] = [
  {
    key: '1',
    title: (
      <>
        <Text style={{ color: '#fff' }}>Meet Your New </Text>
        <Text style={{ color: '#7CF6AD' }}>AI </Text>
        <Text style={{ color: '#BCF489' }}>Companion</Text>
      </>
    ),
    description: "It's a pleasure to meet you! How can I assist you today?",
    image: botImage,
  },
  {
    key: '2',
    title: (
      <>
        <Text style={{ color: '#fff' }}>Your </Text>
        <Text style={{ color: '#7CF6AD' }}>AI </Text>
        <Text style={{ color: '#BCF489' }}>Companion </Text>
        <Text style={{ color: '#fff' }}>is just a message away</Text>
      </>
    ),
    description: 'Powered by LangChain Intelligence.',
    image: botChatImage,
  },
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();
  const flatListRef = useRef<FlatList<Slide>>(null);

  useEffect(() => {
    (async () => {
      const seen = await hasSeenOnboarding();
      if (seen) {
        router.replace('/home');
      } else {
        setIsReady(true)
      }
    })();
  }, []);

  const viewConfig = { viewAreaCoveragePercentThreshold: 50 };

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const nextSlide = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await setOnboardingSeen();
      router.replace('/auth/login');
    }
  };

  if (!isReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfig}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <LinearGradient
            colors={[
              "rgba(124, 246, 173, 0.13)",
              '#050505',
            ]}
            style={[styles.slide, { width }]}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={item.image} style={styles.image} />
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </LinearGradient>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
        <LinearGradient
          colors={[
            "#7CF6AD",
            '#15D2E9',
          ]}
          style={{ borderRadius: 25 }}
        >
          <TouchableOpacity style={styles.button} onPress={nextSlide}>
            <Text style={styles.buttonText}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#050505" },
  slide: { justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 80 },
  title: { fontSize: 35, fontWeight: '700', marginBottom: 10, textAlign: "center" },
  description: { fontSize: 17, textAlign: 'center', color: "#fff" },
  footer: { paddingHorizontal: 20, paddingVertical: 20 },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15, },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, },
  activeDot: { backgroundColor: '#ccc', },
  inactiveDot: { backgroundColor: '#333', },
  button: { paddingVertical: 15, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 500 },
  image: { width: 270, height: 270 }
});