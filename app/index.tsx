import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EventCard from "../components/EventCard";
import Screen from "../components/screen";
import { mockEvents } from "../lib/mockEvents";
import { theme } from "../lib/theme";

export default function Home() {
  const insets = useSafeAreaInsets();
  const featuredEvents = mockEvents.slice(0, 3);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(
    featuredEvents.map(() => new Animated.Value(0))
  ).current;
  const cardPressScales = useRef(
    featuredEvents.map(() => new Animated.Value(1))
  ).current;
  const bookmarkScale = useRef(new Animated.Value(1)).current;
  const bookmarkHighlight = useRef(new Animated.Value(0)).current;
  const ctaScale = useRef(new Animated.Value(1)).current;
  const ctaHighlight = useRef(new Animated.Value(0)).current;
  const heroTextAnim = useRef(new Animated.Value(0)).current;
  const iconOpacities = useRef(
    ["🚴", "🏃", "🏊"].map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  ).current;
  const activeIconIndex = useRef(0);

  useEffect(() => {
    const headerTiming = Animated.timing(headerAnim, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    const cardSprings = cardAnims.map((anim, index) =>
      Animated.spring(anim, {
        toValue: 1,
        delay: index * 80,
        useNativeDriver: true,
        mass: 0.8,
        damping: 12,
        stiffness: 120,
      })
    );
    const heroTextTiming = Animated.timing(heroTextAnim, {
      toValue: 1,
      duration: 520,
      delay: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    headerTiming.start();
    cardSprings.forEach((spring) => spring.start());
    heroTextTiming.start();

    return () => {
      headerTiming.stop();
      cardSprings.forEach((spring) => spring.stop());
      heroTextTiming.stop();
    };
  }, [cardAnims, headerAnim, heroTextAnim]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = activeIconIndex.current;
      const nextIndex = (currentIndex + 1) % iconOpacities.length;

      Animated.timing(iconOpacities[currentIndex], {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      Animated.timing(iconOpacities[nextIndex], {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

      activeIconIndex.current = nextIndex;
    }, 2500);

    return () => {
      clearInterval(intervalId);
    };
  }, [iconOpacities]);

  const handleButtonPressIn = (
    scale: Animated.Value,
    highlight: Animated.Value
  ) => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
    Animated.timing(highlight, {
      toValue: 1,
      duration: 120,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = (
    scale: Animated.Value,
    highlight: Animated.Value
  ) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 18,
      bounciness: 6,
    }).start();
    Animated.timing(highlight, {
      toValue: 0,
      duration: 140,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handleCardPressIn = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 22,
      bounciness: 0,
    }).start();
  };

  const handleCardPressOut = (scale: Animated.Value) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 18,
      bounciness: 6,
    }).start();
  };

  const titleScale = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [1, 0.88],
    extrapolate: "clamp",
  });
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.65],
    extrapolate: "clamp",
  });

  return (
    <Screen>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.banner,
            {
              paddingTop: insets.top + 18,
            },
          ]}
        >
          <View style={styles.bannerGlowLarge} />
          <View style={styles.bannerGlowMedium} />
          <View style={styles.bannerGlowSmall} />
          <View style={styles.bannerIconStack}>
            {[
              { emoji: "🚴", label: "CYCLING" },
              { emoji: "🏃", label: "RUNNING" },
              { emoji: "🏊", label: "SWIMMING" },
            ].map((item, index) => (
              <Animated.View
                key={item.label}
                style={[
                  styles.bannerIconLayer,
                  { opacity: iconOpacities[index] },
                ]}
              >
                <Text style={styles.bannerIcon}>{item.emoji}</Text>
                <Animated.Text
                  style={[
                    styles.bannerIconLabel,
                    { opacity: iconOpacities[index] },
                  ]}
                >
                  {item.label}
                </Animated.Text>
              </Animated.View>
            ))}
          </View>
          <Animated.View
            style={[
              styles.bannerText,
              {
                opacity: heroTextAnim,
                transform: [
                  {
                    translateY: heroTextAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.bannerHeadline}>Find Your Next Event</Text>
            <Text style={styles.bannerSubtitle}>
              Discover local sports events near you
            </Text>
          </Animated.View>
        </View>
        <Animated.View
          style={[
            styles.headerRow,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: titleOpacity,
                transform: [{ scale: titleScale }],
              },
            ]}
          >
            Aptus
          </Animated.Text>
          <Link href="/saved" asChild>
            <TouchableWithoutFeedback
              onPressIn={() =>
                handleButtonPressIn(bookmarkScale, bookmarkHighlight)
              }
              onPressOut={() =>
                handleButtonPressOut(bookmarkScale, bookmarkHighlight)
              }
            >
              <Animated.View
                style={[
                  styles.bookmarkButton,
                  {
                    transform: [{ scale: bookmarkScale }],
                  },
                ]}
              >
                <Animated.View
                  pointerEvents="none"
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      backgroundColor: "rgba(255, 255, 255, 0.35)",
                      opacity: bookmarkHighlight,
                      borderRadius: 999,
                    },
                  ]}
                />
                <Text style={styles.bookmarkIcon}>🔖</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Link>
        </Animated.View>

        <Text style={styles.subtitle}>
          Discover endurance events across sports
        </Text>

        <View style={styles.section}>
          {featuredEvents.map((event, index) => {
            const cardAnim = cardAnims[index];
            const cardScale = cardPressScales[index];

            return (
              <Link key={event.id} href={`/event/${event.id}`} asChild>
                <TouchableWithoutFeedback
                  onPressIn={() => handleCardPressIn(cardScale)}
                  onPressOut={() => handleCardPressOut(cardScale)}
                >
                  <Animated.View
                    style={[
                      styles.cardShell,
                      {
                        opacity: cardAnim,
                        transform: [
                          {
                            translateY: cardAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [14, 0],
                            }),
                          },
                          { scale: cardScale },
                        ],
                      },
                    ]}
                  >
                    <EventCard
                      name={event.name}
                      location={event.location}
                      date={event.date}
                      sport={event.sport}
                    />
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Link>
            );
          })}
        </View>

        <Link href="/search" asChild>
          <TouchableWithoutFeedback
            onPressIn={() => handleButtonPressIn(ctaScale, ctaHighlight)}
            onPressOut={() => handleButtonPressOut(ctaScale, ctaHighlight)}
          >
            <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
              <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    opacity: ctaHighlight,
                  },
                ]}
              />
              <Text style={styles.cta}>Browse all events →</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Link>
      </Animated.ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 240,
    marginHorizontal: -theme.spacing.md,
    backgroundColor: "#0a0a0a",
    borderBottomWidth: 1,
    borderColor: "#0f1a24",
    paddingHorizontal: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bannerGlowLarge: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#4da6ff",
    opacity: 0.12,
    top: -40,
    left: -30,
  },
  bannerGlowMedium: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#4da6ff",
    opacity: 0.16,
    top: 30,
    right: -40,
  },
  bannerGlowSmall: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#4da6ff",
    opacity: 0.18,
    bottom: -10,
    left: 40,
  },
  bannerIconStack: {
    alignItems: "center",
    justifyContent: "center",
    height: 130,
  },
  bannerIconLayer: {
    position: "absolute",
    alignItems: "center",
  },
  bannerIcon: {
    fontSize: 80,
  },
  bannerIconLabel: {
    marginTop: 6,
    letterSpacing: 3,
    fontSize: 13,
    fontWeight: "700",
    color: "#4da6ff",
  },
  bannerText: {
    alignItems: "center",
    marginTop: 8,
  },
  bannerHeadline: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
  },
  bannerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#8a8a8a",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  cardShell: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    overflow: "hidden",
  },
  bookmarkButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#00E5FF",
    backgroundColor: "rgba(0, 229, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkIcon: {
    fontSize: 18,
  },
  cta: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
});
