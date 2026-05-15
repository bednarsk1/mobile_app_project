import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function ProgressScreen() {
  const [lessonCompleted, setLessonCompleted] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      const completed = await AsyncStorage.getItem("lesson1Completed");

      if (completed === "true") {
        setLessonCompleted(true);
      }
    };

    loadProgress();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Postęp nauki</Text>

      <View style={styles.progressCard}>
        <Text style={styles.progressText}>Postęp kursu</Text>
        <Text style={styles.percent}>{lessonCompleted ? "33%" : "0%"}</Text>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: lessonCompleted ? `33%` : `0%`,
              },
            ]}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Lekcje</Text>

      <TouchableOpacity
        style={styles.lessonCard}
        onPress={() => router.push("/tabs2/lesson1")}
      >
        <Text style={styles.lessonTitle}>Lekcja 1</Text>
        <Text style={styles.lessonDescription}>
          Podstawowe zwroty po angielsku
        </Text>
        <Text
          style={
            lessonCompleted ? styles.lessonCompleted : styles.lessonAvailable
          }
        >
          {lessonCompleted ? "✅ Wykonano" : "▶ Rozpocznij lekcję"}
        </Text>
      </TouchableOpacity>

      <View
        style={lessonCompleted ? styles.lessonCard : styles.lessonLockedCard}
      >
        <Text style={styles.lessonTitle}>Lekcja 2</Text>
        <Text style={styles.lessonDescription}>Przedstawianie się</Text>

        <Text
          style={lessonCompleted ? styles.lessonAvailable : styles.lessonLocked}
        >
          {lessonCompleted ? "▶ Odblokowano" : "🔒 Zablokowane"}
        </Text>
      </View>

      <View style={styles.lessonLockedCard}>
        <Text style={styles.lessonTitle}>Lekcja 3</Text>
        <Text style={styles.lessonDescription}>Liczby i kolory</Text>
        <Text style={styles.lessonLocked}>🔒 Zablokowane</Text>
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={async () => {
          await AsyncStorage.removeItem("lesson1Completed");
          setLessonCompleted(false);
        }}
      >
        <Text style={styles.resetButtonText}>Reset Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    padding: 25,
    paddingTop: 80,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 20,
    marginBottom: 35,
  },
  progressText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  percent: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 18,
  },
  progressBarBackground: {
    height: 14,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111",
  },
  lessonCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
  },
  lessonLockedCard: {
    backgroundColor: "#ECECEC",
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    opacity: 0.7,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111",
  },
  lessonDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  lessonAvailable: {
    fontSize: 16,
    color: "#4F46E5",
    fontWeight: "600",
  },
  lessonCompleted: {
    fontSize: 16,
    color: "green",
    fontWeight: "600",
  },
  lessonLocked: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
  },
  resetButton: {
    marginTop: 25,
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
