import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import Screen from "../components/screen";
import { mockEvents } from "../lib/mockEvents";
import { theme } from "../lib/theme";
import { Event } from "../lib/types";

const SPORT_FILTERS: Array<"All" | Event["sport"]> = [
  "All",
  "Running",
  "Cycling",
  "Triathlon",
  "Hybrid",
];

type DateFilter = "All Dates" | "Next 30 Days" | "Next 90 Days" | "This Year";

const DATE_FILTERS: DateFilter[] = [
  "All Dates",
  "Next 30 Days",
  "Next 90 Days",
  "This Year",
];

// Robust parser for mock date strings (e.g. "Apr 20, 2026")
function parseEventDate(dateStr: string): Date | null {
  // ISO: YYYY-MM-DD
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    const asDate = new Date(Number(y), Number(m) - 1, Number(d));
    return Number.isNaN(asDate.getTime()) ? null : asDate;
  }

  // Named month: "Apr 20, 2026"
  const namedMatch = /^([A-Za-z]{3})\s+(\d{1,2}),\s*(\d{4})$/.exec(dateStr);
  if (namedMatch) {
    const [, mon, day, year] = namedMatch;
    const monthMap: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const monthIndex = monthMap[mon];
    if (monthIndex === undefined) return null;

    const asDate = new Date(Number(year), monthIndex, Number(day));
    return Number.isNaN(asDate.getTime()) ? null : asDate;
  }

  // Fallback
  const fallback = new Date(dateStr);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function isWithinDays(date: Date, now: Date, days: number): boolean {
  const end = new Date(now);
  end.setDate(end.getDate() + days);
  return date >= now && date <= end;
}

export default function Search() {
  const [activeSport, setActiveSport] = useState<"All" | Event["sport"]>("All");
  const [activeDate, setActiveDate] = useState<DateFilter>("All Dates");

  const filteredEvents = useMemo(() => {
    // Sport filter
    const sportFiltered =
      activeSport === "All"
        ? mockEvents
        : mockEvents.filter((e) => e.sport === activeSport);

    // Date filter
    if (activeDate === "All Dates") return sportFiltered;

    const now = new Date();
    const thisYear = now.getFullYear();

    return sportFiltered.filter((event) => {
      const parsed = parseEventDate(event.date);
      if (!parsed) return false;

      if (activeDate === "This Year") {
        return parsed.getFullYear() === thisYear;
      }

      if (activeDate === "Next 30 Days") {
        return isWithinDays(parsed, now, 30);
      }

      if (activeDate === "Next 90 Days") {
        return isWithinDays(parsed, now, 90);
      }

      return true;
    });
  }, [activeSport, activeDate]);

  return (
    <Screen>
      <Text style={styles.heading}>Search</Text>

      {/* Sport filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersRow}
      >
        {SPORT_FILTERS.map((filter) => {
          const isActive = filter === activeSport;

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveSport(filter)}
              style={[styles.pill, isActive && styles.pillActive]}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Date filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersRow}
      >
        {DATE_FILTERS.map((filter) => {
          const isActive = filter === activeDate;

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveDate(filter)}
              style={[styles.pill, isActive && styles.pillActive]}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
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

        {filteredEvents.length === 0 && (
          <Text style={styles.emptyText}>No events match your filters.</Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: theme.colors.textPrimary,
  },
  filtersRow: {
    marginBottom: theme.spacing.sm,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  pillActive: {
    borderWidth: 2,
  },
  pillText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  pillTextActive: {
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  list: {
    marginTop: theme.spacing.sm,
  },
  emptyText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
});
