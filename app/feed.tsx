import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../components/screen";
import { theme } from "../lib/theme";

type FeedPost = {
  id: string;
  displayName: string;
  username: string;
  eventName: string;
  caption: string;
  resultStat: string;
};

const mockPosts: FeedPost[] = [
  {
    id: "1",
    displayName: "Maya Thompson",
    username: "@maya_runs",
    eventName: "Riverfront Half Marathon",
    caption: "Held steady through mile 10 and found a kick at the end.",
    resultStat: "1:42:11 Half Marathon",
  },
  {
    id: "2",
    displayName: "Lucas Pereira",
    username: "@lucaspace",
    eventName: "City Night 10K",
    caption: "Cool weather and fast legs tonight. New milestone unlocked.",
    resultStat: "PR in the 10K",
  },
  {
    id: "3",
    displayName: "Jordan Lee",
    username: "@jlee_tri",
    eventName: "Sunset Sprint Triathlon",
    caption: "Swim felt smooth, bike split surprised me, run sealed it.",
    resultStat: "Top 10 Age Group",
  },
  {
    id: "4",
    displayName: "Amara Okafor",
    username: "@amara.strides",
    eventName: "Lakeside 5K Series",
    caption: "Pushed the middle kilometer and closed hard with the group.",
    resultStat: "19:48 5K",
  },
];

export default function Feed() {
  return (
    <Screen>
      <Text style={styles.title}>Activity Feed</Text>
      <Text style={styles.subtitle}>
        Follow race-day moments and fresh fitness results from your community.
      </Text>

      <ScrollView
        style={styles.feedList}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {mockPosts.map((post) => (
          <View key={post.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.nameBlock}>
                <Text style={styles.displayName}>{post.displayName}</Text>
                <Text style={styles.username}>{post.username}</Text>
              </View>

              <Pressable style={styles.followButton}>
                <Text style={styles.followText}>Follow</Text>
              </Pressable>
            </View>

            <Text style={styles.eventName}>{post.eventName}</Text>
            <Text style={styles.caption}>{post.caption}</Text>
            <Text style={styles.resultStat}>{post.resultStat}</Text>

            <View style={styles.actionsRow}>
              <Pressable>
                <Text style={styles.actionText}>Like</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.actionText}>Comment</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.actionText}>Share</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  feedList: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  nameBlock: {
    flexShrink: 1,
    marginRight: theme.spacing.sm,
  },
  displayName: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  username: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  followButton: {
    backgroundColor: "#2563EB",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  followText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  eventName: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
  resultStat: {
    color: "#60A5FA",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
});
