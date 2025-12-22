import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import Screen from "../components/screen";

export default function Home() {
  return (
    <Screen>
      <Text>Aptus Home</Text>

      <Link href="/search" asChild>
        <Pressable>
          <Text>Go to Search</Text>
        </Pressable>
      </Link>
    </Screen>
  );
}
