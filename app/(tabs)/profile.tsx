import { ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/screen";
import { currentUser } from "../../lib/user";

const mockUserPosts = [
  {
    id: "1",
    eventName: "Twin Cities Marathon",
    caption: "Big training block starting now.",
    resultStat: "Long run complete",
  },
  {
    id: "2",
    eventName: "Grandma’s Marathon",
    caption: "One of my favorite race weekends.",
    resultStat: "Previous race",
  },
];

export default function Profile() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {currentUser.name.charAt(0)}
            </Text>
          </View>

          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.username}>{currentUser.username}</Text>
          <Text style={styles.bio}>{currentUser.bio}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{mockUserPosts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Races</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Posts</Text>

        <View style={styles.postsList}>
          {mockUserPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postEvent}>{post.eventName}</Text>
              <Text style={styles.postCaption}>{post.caption}</Text>
              <Text style={styles.postStat}>{post.resultStat}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#111827",
    borderWidth: 2,
    borderColor: "#00E5FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  username: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 4,
  },
  bio: {
    color: "#D1D5DB",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 22,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 4,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  postsList: {
    gap: 12,
  },
  postCard: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 12,
    padding: 14,
  },
  postEvent: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  postCaption: {
    color: "#D1D5DB",
    fontSize: 14,
    marginBottom: 8,
  },
  postStat: {
    color: "#00E5FF",
    fontSize: 13,
    fontWeight: "600",
  },
});