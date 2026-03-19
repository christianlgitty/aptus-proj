import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import Screen from "../components/screen";
import { mockEvents } from "../lib/mockEvents";
import { theme } from "../lib/theme";

export default function Home() {
  const featuredEvents = mockEvents.slice(0, 3);

  return (
    <Screen>
      <Text style={styles.title}>Aptus</Text>
      <Text style={styles.subtitle}>
        Discover endurance events across sports
      </Text>

      <View style={styles.section}>
        {featuredEvents.map((event) => (
          <Link key={event.id} href={`/event/${event.id}`} asChild>
            <Pressable>
              <EventCard
                name={event.name}
                location={event.location}
                date={event.date}
                sport={event.sport}
              />
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.buttonGroup}>
        <Link href="/search" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Browse all events</Text>
          </Pressable>
        </Link>

        <Link href="/feed" asChild>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Open activity feed</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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