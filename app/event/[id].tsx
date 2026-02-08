import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EventDetail() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Harbor City Half Marathon</Text>
        <Text style={styles.subtext}>Sat, Oct 12 · 7:30 AM</Text>
        <Text style={styles.subtext}>San Diego, CA · Embarcadero Park</Text>
      </View>

      <View style={styles.chipRow}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Running</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>13.1 mi</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Intermediate</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bodyText}>
          Cruise the waterfront at sunrise with a fast, scenic course designed
          for personal bests and first-time half marathoners alike. Expect lively
          aid stations, coastal views, and a festival finish line.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Key Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Time</Text>
          <Text style={styles.detailValue}>7:30 AM</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Check-In Window</Text>
          <Text style={styles.detailValue}>6:00 AM - 7:00 AM</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Course Type</Text>
          <Text style={styles.detailValue}>Road · Coastal</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Elevation</Text>
          <Text style={styles.detailValue}>Mostly Flat · 210 ft</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Pressable
          style={[styles.primaryButton, styles.primaryButtonDisabled]}
          disabled
        >
          <Text style={styles.primaryButtonText}>Register (Coming Soon)</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction} disabled>
          <Text style={styles.secondaryActionText}>Share</Text>
          {/* TODO: wire up share action */}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f1115",
  },
  container: {
    padding: 20,
    gap: 18,
  },
  card: {
    backgroundColor: "#161a22",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f8f9fb",
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: "#a7b0c0",
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    backgroundColor: "#1f2633",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#2d3646",
  },
  chipText: {
    color: "#d6dce8",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f4f9",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#c2c9d6",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#242b39",
  },
  detailLabel: {
    color: "#aab2c2",
    fontSize: 13,
  },
  detailValue: {
    color: "#f0f3f8",
    fontSize: 13,
    fontWeight: "600",
  },
  primaryButton: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryButtonDisabled: {
    backgroundColor: "#2a3342",
    opacity: 0.6,
  },
  primaryButtonText: {
    color: "#d4d9e4",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryAction: {
    marginTop: 12,
    alignItems: "center",
  },
  secondaryActionText: {
    color: "#8f98aa",
    fontSize: 14,
    fontWeight: "600",
  },
});

