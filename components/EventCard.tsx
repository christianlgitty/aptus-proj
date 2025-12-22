import { StyleSheet, Text, View } from "react-native";
import { theme } from "../lib/theme";

type EventCardProps = {
  name: string;
  location: string;
  date: string;
  sport: string;
};

export default function EventCard({
  name,
  location,
  date,
  sport,
}: EventCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.meta}>{sport}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>
        {location} · {date}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  meta: {
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
    color: theme.colors.textSecondary,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.colors.textPrimary,
  },
  details: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
