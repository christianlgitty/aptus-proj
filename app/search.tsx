import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import EventCard from "../components/EventCard";
import Screen from "../components/screen";

const EVENTS = [
  {
    id: "boston-marathon",
    name: "Boston Marathon",
    location: "Boston, MA",
    date: "Apr 20, 2026",
    sport: "Running",
  },
  {
    id: "nyc-marathon",
    name: "NYC Marathon",
    location: "New York, NY",
    date: "Nov 1, 2026",
    sport: "Running",
  },
];

export default function Search() {
  return (
    <Screen>
      <Text>Search</Text>

      {EVENTS.map((event) => (
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
    </Screen>
  );
}
