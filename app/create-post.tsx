import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Screen from "../components/screen";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [result, setResult] = useState("");

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Post</Text>

        <Text style={styles.label}>Caption</Text>
        <TextInput
          style={styles.input}
          placeholder="Share your race experience..."
          placeholderTextColor="#6B7280"
          value={caption}
          onChangeText={setCaption}
          multiline
        />

        <Text style={styles.label}>Race/Event</Text>
        <View style={styles.input}>
          <Text style={styles.placeholder}>Select a race (coming soon)</Text>
        </View>

        <Text style={styles.label}>Result</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 1:42:11 Half Marathon PR"
          placeholderTextColor="#6B7280"
          value={result}
          onChangeText={setResult}
        />

        <View style={styles.photoBox}>
          <Text style={styles.placeholder}>Add photo (coming soon)</Text>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>

        <Text style={styles.helper}>
          Posts are currently UI-only and won’t be saved yet.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  label: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 10,
    padding: 12,
    color: "#FFFFFF",
  },
  placeholder: {
    color: "#6B7280",
  },
  photoBox: {
    height: 120,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  helper: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});