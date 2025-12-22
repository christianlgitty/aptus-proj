import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

const EVENTS = [
  { id: "boston-marathon", name: "Boston Marathon" },
  { id: "nyc-marathon", name: "NYC Marathon" },
];

export default function Search() {
  return (
    <View>
      <Text>Search</Text>

      {EVENTS.map((event) => (
        <Link key={event.id} href={`/event/${event.id}`} asChild>
          <Pressable>
            <Text>{event.name}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
