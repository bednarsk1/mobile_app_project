import { useState } from "react";
import { StyleSheet, Switch, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ConfigScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ekran konfiguracyjny</Text>

      <View style={styles.optionBox}>
        <Text style={styles.optionText}>Powiadomienia</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.optionBox}>
        <Text style={styles.optionText}>Tryb ciemny</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.optionBox}>
        <Text style={styles.optionText}>Dźwięki aplikacji</Text>
        <Switch value={soundEnabled} onValueChange={setSoundEnabled} />
      </View>

      <Text style={styles.info}>
        Tutaj użytkownik może zmieniać ustawienia aplikacji do nauki języków.
      </Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    padding: 25,
    paddingTop: 80,
  },
  backButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    position: "absolute",
    right: 25,
    bottom: 40,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 30,
  },
  optionBox: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#111",
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});
