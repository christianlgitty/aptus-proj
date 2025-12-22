import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import Screen from "../components/screen";

const EVENTS = [
  { id: "boston-marathon", name: "Boston Marathon" },
  { id: "nyc-marathon", name: "NYC Marathon" },
];

export default function Search() {
  return (
    <Screen>
      <Text>Search</Text>

      {EVENTS.map((event) => (
        <Link key={event.id} href={`/event/${event.id}`} asChild>
          <Pressable>
            <Text>{event.name}</Text>
          </Pressable>
        </Link>
      ))}
    </Screen>
  );
}
