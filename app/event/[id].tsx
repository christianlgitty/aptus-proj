import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import Screen from "../../components/screen";

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Screen>
      <Text>Event Detail</Text>
      <Text>{id}</Text>
    </Screen>
  );
}
