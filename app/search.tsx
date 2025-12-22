import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import EventCard from "../components/EventCard";
import Screen from "../components/screen";
import { mockEvents } from "../lib/mockEvents";

export default function Search() {
  return (
    <Screen>
      <Text>Search</Text>

      {mockEvents.map((event) => (
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
