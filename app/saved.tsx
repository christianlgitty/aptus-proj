import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../components/screen";
import { theme } from "../lib/theme";

const HAS_SAVED_EVENTS = false;
const ACCENT_BLUE = "#3B82F6";

const mockSavedEvents = [
  {
    id: "save-1",
    title: "Riverfront 10K",
    dateTime: "May 18, 2026 · 7:00 AM",
    location: "Portland, OR",
    sport: "Running",
    format: "Road",
  },
  {
    id: "save-2",
    title: "Sunrise Century Ride",
    dateTime: "Jun 2, 2026 · 6:30 AM",
    location: "Boulder, CO",
    sport: "Cycling",
    format: "Gran Fondo",
  },
  {
    id: "save-3",
    title: "Harbor Tri Classic",
    dateTime: "Aug 9, 2026 · 8:00 AM",
    location: "Charleston, SC",
    sport: "Triathlon",
    format: "Olympic",
  },
];

export default function Saved() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Saved</Text>

        {!HAS_SAVED_EVENTS && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No saved events yet</Text>
            <Pressable disabled style={[styles.button, styles.buttonDisabled]}>
              <Text style={styles.buttonTextDisabled}>Browse events</Text>
            </Pressable>
          </View>
        )}

        {HAS_SAVED_EVENTS && (
          <View style={styles.list}>
            {mockSavedEvents.map((event) => (
              <View key={event.id} style={styles.card}>
                <Text style={styles.cardTitle}>{event.title}</Text>
                <Text style={styles.cardMeta}>{event.dateTime}</Text>
                <Text style={styles.cardMeta}>{event.location}</Text>

                <View style={styles.chipsRow}>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{event.sport}</Text>
                  </View>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{event.format}</Text>
                  </View>
                </View>

                <Pressable
                  disabled
                  style={[styles.removeButton, styles.removeButtonDisabled]}
                >
                  <Text style={styles.removeButtonTextDisabled}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  emptyState: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    marginBottom: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: ACCENT_BLUE,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextDisabled: {
    fontSize: 14,
    fontWeight: "600",
    color: ACCENT_BLUE,
  },
  list: {
    gap: theme.spacing.md,
  },
  card: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: theme.colors.textPrimary,
  },
  cardMeta: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  chipsRow: {
    flexDirection: "row",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: ACCENT_BLUE,
    backgroundColor: "rgba(59, 130, 246, 0.12)",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: ACCENT_BLUE,
  },
  removeButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  removeButtonDisabled: {
    opacity: 0.5,
  },
  removeButtonTextDisabled: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textSecondary,
  },
});
