import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AuthorsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informacje o autorach</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Autorzy aplikacji:</Text>

        <Text style={styles.author}>• Piotr Bednarski 15240</Text>
        <Text style={styles.author}>• Jakub Opoka 15222</Text>
      </View>

      <Image
        source={require("../../assets/images/download.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.ideis}>IDEIS</Text>

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
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 18,
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 18,
    color: "#333",
  },
  author: {
    fontSize: 20,
    marginBottom: 12,
    color: "#111",
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 25,
  },
  ideis: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  backButton: {
    position: "absolute",
    right: 25,
    bottom: 40,
    width: 55,
    height: 55,
    backgroundColor: "#4F46E5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});
