import { StyleSheet, Text, View } from "react-native";

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
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  meta: {
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
  },
});
