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
import EventCard from "../../components/EventCard";
import Screen from "../../components/screen";
import { mockEvents } from "../../lib/mockEvents";
import { theme } from "../../lib/theme";

const HERO_ITEMS = [
  { emoji: "🚴", label: "CYCLING" },
  { emoji: "🏃", label: "RUNNING" },
  { emoji: "🏊", label: "SWIMMING" },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const featuredEvents = mockEvents.slice(0, 3);
  const heroTextAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(
    featuredEvents.map(() => new Animated.Value(0))
  ).current;
  const iconOpacities = useRef(
    HERO_ITEMS.map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  ).current;
  const activeIconIndex = useRef(0);
  const browseScale = useRef(new Animated.Value(1)).current;
  const browseHighlight = useRef(new Animated.Value(0)).current;
  const feedScale = useRef(new Animated.Value(1)).current;
  const feedHighlight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const heroTextTiming = Animated.timing(heroTextAnim, {
      toValue: 1,
      duration: 520,
      delay: 140,
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

    heroTextTiming.start();
    cardSprings.forEach((spring) => spring.start());

    return () => {
      heroTextTiming.stop();
      cardSprings.forEach((spring) => spring.stop());
    };
  }, [cardAnims, heroTextAnim]);

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
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
    Animated.timing(highlight, {
      toValue: 0.15,
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

  return (
    <Screen>
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.banner,
            {
              paddingTop: insets.top + 18,
            },
          ]}
        >
          <View style={styles.bannerGradientBase} />
          <View style={styles.bannerGradientAccent} />
          <View style={styles.bannerGlowLarge} />
          <View style={styles.bannerGlowMedium} />
          <View style={styles.bannerGlowSmall} />

          <View style={styles.bannerIconStack}>
            {HERO_ITEMS.map((item, index) => (
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

        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionAccent} />
          <Text style={styles.title}>Aptus</Text>
        </View>
        <Text style={styles.subtitle}>
          Discover endurance events across sports
        </Text>

        <View style={styles.section}>
          {featuredEvents.map((event, index) => {
            const cardAnim = cardAnims[index];
            return (
              <Link key={event.id} href={`/event/${event.id}`} asChild>
                <TouchableWithoutFeedback>
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

        <View style={styles.buttonGroup}>
          <Link href="/search" asChild>
            <TouchableWithoutFeedback
              onPressIn={() => handleButtonPressIn(browseScale, browseHighlight)}
              onPressOut={() => handleButtonPressOut(browseScale, browseHighlight)}
            >
              <Animated.View
                style={[
                  styles.button,
                  {
                    transform: [{ scale: browseScale }],
                  },
                ]}
              >
                <Animated.View
                  pointerEvents="none"
                  style={[
                    StyleSheet.absoluteFillObject,
                    styles.buttonHighlight,
                    { opacity: browseHighlight },
                  ]}
                />
                <Text style={styles.buttonText}>Browse all events</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Link>

          <Link href="/feed" asChild>
            <TouchableWithoutFeedback
              onPressIn={() => handleButtonPressIn(feedScale, feedHighlight)}
              onPressOut={() => handleButtonPressOut(feedScale, feedHighlight)}
            >
              <Animated.View
                style={[
                  styles.button,
                  {
                    transform: [{ scale: feedScale }],
                  },
                ]}
              >
                <Animated.View
                  pointerEvents="none"
                  style={[
                    StyleSheet.absoluteFillObject,
                    styles.buttonHighlight,
                    { opacity: feedHighlight },
                  ]}
                />
                <Text style={styles.buttonText}>Open activity feed</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Link>
        </View>
      </Animated.ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 240,
    marginHorizontal: -theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  bannerGradientBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0a0a0a",
  },
  bannerGradientAccent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
    backgroundColor: "#1a2a3a",
    opacity: 0.85,
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
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.md,
  },
  sectionAccent: {
    width: 3,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#4da6ff",
    marginRight: 10,
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
    marginBottom: 12,
  },
  buttonGroup: {
    marginTop: 10,
    gap: 12,
  },
  button: {
    backgroundColor: "#111827",
    borderWidth: 3,
    borderColor: "#00E5FF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    overflow: "hidden",
  },
  buttonHighlight: {
    backgroundColor: "#ffffff",
  },
  buttonPressed: {
    backgroundColor: "#1F2937",
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
