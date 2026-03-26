import { useLocalSearchParams } from "expo-router";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/screen";

type EventDetailData = {
  title: string;
  date: string;
  location: string;
  distanceType: string;
  price: string;
  registrationStatus: string;
  officialSite?: string;
  registrationUrl?: string;
};

const MOCK_EVENTS: Record<string, EventDetailData> = {
  "boston-marathon": {
    title: "Boston Marathon",
    date: "Apr 20, 2026",
    location: "Boston, MA",
    distanceType: "Marathon (42.2 km)",
    price: "$250",
    registrationStatus: "Closed",
    officialSite: "https://www.baa.org/races/boston-marathon",
    registrationUrl: "https://www.baa.org/races/boston-marathon/enter",
  },
  "nyc-marathon": {
    title: "New York City Marathon",
    date: "Nov 1, 2026",
    location: "New York, NY",
    distanceType: "Marathon (42.2 km)",
    price: "$295",
    registrationStatus: "Lottery Open",
    officialSite: "https://www.nyrr.org/tcsnycmarathon",
    registrationUrl: "https://www.nyrr.org/tcsnycmarathon/runners/entry",
  },
  "ironman-kona": {
    title: "Ironman World Championship",
    date: "Oct 10, 2026",
    location: "Kailua-Kona, HI",
    distanceType: "Triathlon (140.6)",
    price: "$1,250",
    registrationStatus: "Qualification Required",
    officialSite: "https://www.ironman.com/im-world-championship-kona",
    registrationUrl: "https://www.ironman.com/register",
  },
  "unbound-gravel": {
    title: "Unbound Gravel",
    date: "Jun 6, 2026",
    location: "Emporia, KS",
    distanceType: "Gravel Cycling (200 mi)",
    price: "$360",
    registrationStatus: "Open",
    officialSite: "https://www.unboundgravel.com",
    registrationUrl: "https://www.unboundgravel.com/register",
  },
};

export default function EventDetail() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
  const event = eventId ? MOCK_EVENTS[eventId] : undefined;

  if (!event) {
    return (
      <Screen>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Event not found</Text>
          <Text style={styles.emptyText}>
            We couldn&apos;t find that event. It may have been moved or removed.
          </Text>
        </View>
      </Screen>
    );
  }

  const hasValidOfficialSite =
    !!event.officialSite &&
    !event.officialSite.includes("example.com") &&
    !event.officialSite.includes("placeholder");

  const registrationLink = event.registrationUrl ?? event.officialSite;

  const openOfficialSite = () => {
    if (event.officialSite) {
      Linking.openURL(event.officialSite);
    }
  };

  const openRegistration = () => {
    if (hasValidOfficialSite && registrationLink) {
      Linking.openURL(registrationLink);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.card}>
          <DetailRow label="Date" value={event.date} />
          <DetailRow label="Location" value={event.location} />
          <DetailRow label="Distance / Type" value={event.distanceType} />
          <DetailRow label="Price" value={event.price} />
          <DetailRow
            label="Registration"
            value={event.registrationStatus}
            isLast
          />
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Save Race</Text>
          </Pressable>

          <Pressable
            style={[
              styles.secondaryButton,
              !event.officialSite && styles.secondaryButtonDisabled,
            ]}
            onPress={openOfficialSite}
            disabled={!event.officialSite}
          >
            <Text style={styles.secondaryButtonText}>Open Official Site</Text>
          </Pressable>
        </View>

        <View style={styles.bottomActionContainer}>
          <Pressable
            style={[
              styles.primaryButton,
              !hasValidOfficialSite && styles.secondaryButtonDisabled,
            ]}
            onPress={openRegistration}
            disabled={!hasValidOfficialSite}
          >
            <Text style={styles.primaryButtonText}>
              {hasValidOfficialSite
                ? "Register for Race"
                : "Registration Link Coming Soon"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

function DetailRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, isLast && styles.lastRow]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1D4ED8",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    color: "#93C5FD",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  rowValue: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "600",
  },
  actions: {
    gap: 10,
  },
  bottomActionContainer: {
    marginTop: "auto",
    paddingTop: 20,
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonDisabled: {
    opacity: 0.5,
  },
  secondaryButtonText: {
    color: "#93C5FD",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
