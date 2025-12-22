import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Event Detail</Text>
      <Text>{id}</Text>
    </View>
  );
}
