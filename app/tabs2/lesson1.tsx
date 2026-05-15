import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Lesson1Screen() {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [question, setQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.title}>Omówienie tematu</Text>

          <Text style={styles.text}>
            W tej lekcji nauczysz się podstawowych zwrotów po angielsku.
          </Text>

          <Text style={styles.example}>• Hello → Cześć</Text>
          <Text style={styles.example}>• Thank you → Dziękuję</Text>
          <Text style={styles.example}>• Goodbye → Do widzenia</Text>

          <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
            <Text style={styles.buttonText}>Dalej</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.title}>Przykłady</Text>

          <View style={styles.exampleCard}>
            <Text style={styles.english}>Hello!</Text>
            <Text style={styles.polish}>Cześć!</Text>
          </View>

          <View style={styles.exampleCard}>
            <Text style={styles.english}>Thank you very much.</Text>
            <Text style={styles.polish}>Bardzo dziękuję.</Text>
          </View>

          <View style={styles.exampleCard}>
            <Text style={styles.english}>Goodbye my friend.</Text>
            <Text style={styles.polish}>Do widzenia mój przyjacielu.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setStep(3)}>
            <Text style={styles.buttonText}>Rozpocznij quiz</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.card}>
          <Text style={styles.title}>Quiz</Text>

          {question === 1 && (
            <>
              <Text style={styles.question}>
                Jak jest „Dziękuję” po angielsku?
              </Text>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Thank you" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Thank you");
                  setAnswered(true);
                  setScore(score + 1);
                }}
              >
                <Text style={styles.answerText}>Thank you</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Goodbye" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Goodbye");
                  setAnswered(true);
                }}
              >
                <Text style={styles.answerText}>Goodbye</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Hello" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Hello");
                  setAnswered(true);
                }}
              >
                <Text style={styles.answerText}>Hello</Text>
              </TouchableOpacity>
            </>
          )}

          {question === 2 && (
            <>
              <Text style={styles.question}>
                Jak jest „Cześć” po angielsku?
              </Text>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Hello" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Hello");
                  setAnswered(true);
                  setScore(score + 1);
                }}
              >
                <Text style={styles.answerText}>Hello</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Please" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Please");
                  setAnswered(true);
                }}
              >
                <Text style={styles.answerText}>Please</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Goodbye" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Goodbye");
                  setAnswered(true);
                }}
              >
                <Text style={styles.answerText}>Goodbye</Text>
              </TouchableOpacity>
            </>
          )}

          {question === 3 && (
            <>
              <Text style={styles.question}>
                Jak jest „Do widzenia” po angielsku?
              </Text>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Hello" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Hello");
                  setAnswered(true);
                }}
              >
                <Text style={styles.answerText}>Hello</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Goodbye" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Goodbye");
                  setAnswered(true);
                  setScore(score + 1);
                }}
              >
                <Text style={styles.answerText}>Goodbye</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.answerButton,
                  selectedAnswer === "Please" && styles.selectedAnswer,
                ]}
                disabled={answered}
                onPress={() => {
                  setSelectedAnswer("Please");
                  setAnswered(true);
                }}
              >
                <Text style={styles.answerText}>Please</Text>
              </TouchableOpacity>
            </>
          )}

          {answered && question < 3 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setQuestion(question + 1);
                setAnswered(false);
                setSelectedAnswer("");
              }}
            >
              <Text style={styles.buttonText}>Następne pytanie</Text>
            </TouchableOpacity>
          )}

          {answered && question === 3 && (
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (score === 3) {
                  await AsyncStorage.setItem("lesson1Completed", "true");
                } else {
                  await AsyncStorage.setItem("lesson1Completed", "false");
                }

                setStep(4);
              }}
            >
              <Text style={styles.buttonText}>Zobacz wynik</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {step === 4 && (
        <View style={styles.card}>
          <Text style={styles.title}>Podsumowanie lekcji</Text>

          <Text style={styles.summaryText}>Ukończyłeś pierwszą lekcję 🎉</Text>

          <Text style={styles.result}>Wynik quizu: {score}/3</Text>

          {score === 3 ? (
            <Text style={styles.successText}>✅ Lekcja została ukończona</Text>
          ) : (
            <Text style={styles.failText}>❌ Musisz powtórzyć lekcję</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setStep(1);
              setScore(0);
              setQuestion(1);
              setAnswered(false);
              setSelectedAnswer("");
            }}
          >
            <Text style={styles.buttonText}>Powtórz lekcję</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => router.push("/explore")}
          >
            <Text style={styles.exitButtonText}>Wyjdź do lekcji</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    padding: 25,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 25,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#444",
    lineHeight: 28,
    marginBottom: 25,
  },
  example: {
    fontSize: 20,
    marginBottom: 16,
    color: "#111",
  },
  exampleCard: {
    backgroundColor: "#EEF2FF",
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
  },
  english: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 8,
  },
  polish: {
    fontSize: 18,
    color: "#333",
  },
  button: {
    marginTop: 25,
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  question: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#111",
  },
  answerButton: {
    backgroundColor: "#EEF2FF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  selectedAnswer: {
    backgroundColor: "#C7D2FE",
    borderWidth: 2,
    borderColor: "#4F46E5",
  },
  answerText: {
    fontSize: 18,
    textAlign: "center",
    color: "#111",
  },
  summaryText: {
    fontSize: 22,
    textAlign: "center",
    color: "#333",
    marginBottom: 25,
  },
  result: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F46E5",
    textAlign: "center",
  },
  successText: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
  },
  failText: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  exitButton: {
    marginTop: 14,
    backgroundColor: "#E5E7EB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  exitButtonText: {
    color: "#111",
    fontSize: 18,
    fontWeight: "bold",
  },
});
