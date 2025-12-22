import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import Screen from "../components/screen";
import { mockEvents } from "../lib/mockEvents";
import { Event } from "../lib/types";

const FILTERS: Array<"All" | Event["sport"]> = [
  "All",
  "Running",
  "Cycling",
  "Triathlon",
  "Hybrid",
];

export default function Search() {
  const [activeFilter, setActiveFilter] = useState<
    "All" | Event["sport"]
  >("All");

  const filteredEvents =
    activeFilter === "All"
      ? mockEvents
      : mockEvents.filter((event) => event.sport === activeFilter);

  return (
    <Screen>
      <Text style={styles.heading}>Search</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterPill,
                isActive && styles.activeFilterPill,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  isActive && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.list}>
        {filteredEvents.map((event) => (
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  filters: {
    marginBottom: 16,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  activeFilterPill: {
    borderWidth: 2,
  },
  filterText: {
    fontSize: 14,
  },
  activeFilterText: {
    fontWeight: "600",
  },
  list: {
    marginTop: 8,
  },
});
