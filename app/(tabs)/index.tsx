import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useState } from "react";

export default function HomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("Angielski");
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <Link href="/tabs2/config" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Konfiguracja</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/tabs2/authors" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Autorzy</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>LinguaLearn</Text>
      <Text style={styles.subtitle}>Aplikacja do nauki języków obcych</Text>

      <View style={styles.languageContainer}>
        <Text style={styles.languageLabel}>Wybierz język</Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setOpen(!open)}
        >
          <Text style={styles.dropdownText}>🇬🇧 {selectedLanguage}</Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setSelectedLanguage("Angielski");
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>🇬🇧 Angielski</Text>
            </TouchableOpacity>

            <View style={styles.option}>
              <Text style={styles.disabledText}>
                🇩🇪 Niemiecki (Już wkrótce)
              </Text>
            </View>

            <View style={styles.option}>
              <Text style={styles.disabledText}>
                🇪🇸 Hiszpański (Już wkrótce)
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    padding: 20,
  },
  topButtons: {
    position: "absolute",
    top: 60,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#4F46E5",
    fontWeight: "bold",
  },
  languageContainer: {
    width: "85%",
    marginTop: 20,
  },
  languageLabel: {
    color: "white",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  dropdown: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4F46E5",
  },
  dropdownMenu: {
    position: "absolute",
    top: 95,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 14,
    marginTop: 10,
    overflow: "hidden",
    zIndex: 10,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  optionText: {
    fontSize: 16,
  },
  disabledText: {
    fontSize: 16,
    color: "#888",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
});
