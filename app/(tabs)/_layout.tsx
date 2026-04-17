import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F172A",
          borderTopColor: "#1F2937",
          borderTopWidth: 1,
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#00E5FF",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "index") {
            return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />;
          }
          if (route.name === "search") {
            return <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />;
          }
          if (route.name === "feed") {
            return <Ionicons name={focused ? "newspaper" : "newspaper-outline"} size={size} color={color} />;
          }
          if (route.name === "create-post") {
            return <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={size} color={color} />;
          }
          if (route.name === "saved") {
            return <Ionicons name={focused ? "bookmark" : "bookmark-outline"} size={size} color={color} />;
          }

          return null;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="feed" options={{ title: "Feed" }} />
      <Tabs.Screen name="create-post" options={{ title: "Post" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}