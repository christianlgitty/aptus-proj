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
  },
  "nyc-marathon": {
    title: "New York City Marathon",
    date: "Nov 1, 2026",
    location: "New York, NY",
    distanceType: "Marathon (42.2 km)",
    price: "$295",
    registrationStatus: "Lottery Open",
    officialSite: "https://www.nyrr.org/tcsnycmarathon",
  },
  "ironman-kona": {
    title: "Ironman World Championship",
    date: "Oct 10, 2026",
    location: "Kailua-Kona, HI",
    distanceType: "Triathlon (140.6)",
    price: "$1,250",
    registrationStatus: "Qualification Required",
    officialSite: "https://www.ironman.com/im-world-championship-kona",
  },
  "unbound-gravel": {
    title: "Unbound Gravel",
    date: "Jun 6, 2026",
    location: "Emporia, KS",
    distanceType: "Gravel Cycling (200 mi)",
    price: "$360",
    registrationStatus: "Open",
    officialSite: "https://www.unboundgravel.com",
  },
   "chicago-marathon": {
  title: "Chicago Marathon",
  date: "Oct 11, 2026",
  location: "Chicago, IL",
  distanceType: "Marathon (42.2 km)",
  price: "$230",
  registrationStatus: "Open",
  officialSite: "https://www.chicagomarathon.com",
},
"twin-cities-marathon": {
  title: "Twin Cities Marathon",
  date: "Oct 4, 2026",
  location: "Minneapolis, MN",
  distanceType: "Marathon (42.2 km)",
  price: "$180",
  registrationStatus: "Open",
  officialSite: "https://www.tcmevents.org",
},
"grandmas-marathon": {
  title: "Grandma’s Marathon",
  date: "Jun 20, 2026",
  location: "Duluth, MN",
  distanceType: "Marathon (42.2 km)",
  price: "$160",
  registrationStatus: "Open",
  officialSite: "https://grandmasmarathon.com",
},
"austin-marathon": {
  title: "Austin Marathon",
  date: "Feb 16, 2026",
  location: "Austin, TX",
  distanceType: "Marathon (42.2 km)",
  price: "$175",
  registrationStatus: "Open",
  officialSite: "https://youraustinmarathon.com",
},
"bolder-boulder": {
  title: "Bolder Boulder 10K",
  date: "May 25, 2026",
  location: "Boulder, CO",
  distanceType: "10K Run",
  price: "$65",
  registrationStatus: "Open",
  officialSite: "https://bb10k.bolderboulder.com",
},
"phoenix-half": {
  title: "Phoenix Half Marathon",
  date: "Jan 11, 2026",
  location: "Phoenix, AZ",
  distanceType: "Half Marathon",
  price: "$95",
  registrationStatus: "Open",
  officialSite: "https://www.phoenixhalf.com",
},
"marine-corps-marathon": {
  title: "Marine Corps Marathon",
  date: "Oct 27, 2026",
  location: "Washington, DC",
  distanceType: "Marathon (42.2 km)",
  price: "$210",
  registrationStatus: "Open",
  officialSite: "https://www.marinemarathon.com",
},
"rock-n-roll-vegas": {
  title: "Rock ‘n’ Roll Las Vegas",
  date: "Feb 22, 2026",
  location: "Las Vegas, NV",
  distanceType: "Half Marathon",
  price: "$140",
  registrationStatus: "Open",
  officialSite: "https://www.runrocknroll.com/las-vegas",
},
"hyrox-miami": {
  title: "HYROX Miami",
  date: "Jan 18, 2026",
  location: "Miami, FL",
  distanceType: "Fitness Race",
  price: "$120",
  registrationStatus: "Open",
  officialSite: "https://hyrox.com",
},
"spartan-dallas": {
  title: "Spartan Race Dallas",
  date: "Apr 12, 2026",
  location: "Dallas, TX",
  distanceType: "Obstacle Course Race",
  price: "$130",
  registrationStatus: "Open",
  officialSite: "https://www.spartan.com",
},
"ironman-703-california": {
  title: "Ironman 70.3 California",
  date: "Apr 5, 2026",
  location: "Oceanside, CA",
  distanceType: "Triathlon (70.3)",
  price: "$450",
  registrationStatus: "Open",
  officialSite: "https://www.ironman.com",
},
"leadville-100": {
  title: "Leadville Trail 100",
  date: "Aug 15, 2026",
  location: "Leadville, CO",
  distanceType: "Trail Run (100 mi)",
  price: "$450",
  registrationStatus: "Lottery",
  officialSite: "https://www.leadvilleraceseries.com",
},
"seattle-marathon": {
  title: "Seattle Marathon",
  date: "Nov 30, 2026",
  location: "Seattle, WA",
  distanceType: "Marathon (42.2 km)",
  price: "$140",
  registrationStatus: "Open",
  officialSite: "https://www.seattlemarathon.org",
},
"san-diego-triathlon": {
  title: "San Diego Triathlon",
  date: "Jul 19, 2026",
  location: "San Diego, CA",
  distanceType: "Sprint Triathlon",
  price: "$110",
  registrationStatus: "Open",
  officialSite: "https://sdtriathlon.com",
},
"nashville-5k": {
  title: "Nashville Rock Run 5K",
  date: "Sep 5, 2026",
  location: "Nashville, TN",
  distanceType: "5K Run",
  price: "$40",
  registrationStatus: "Open",
  officialSite: "https://runrocknroll.com",
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

  const openOfficialSite = () => {
    if (event.officialSite) {
      Linking.openURL(event.officialSite);
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

