import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Aptus Home</Text>

      <Link href="/search" asChild>
        <Pressable>
          <Text>Go to Search</Text>
        </Pressable>
      </Link>
    </View>
  );
}
