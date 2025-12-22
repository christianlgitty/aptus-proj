import { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

type ScreenProps = {
  children: ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});
