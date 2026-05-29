import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

export default function Lesson1Screen() {
	const [step, setStep] = useState(1);
	const [score, setScore] = useState(0);
	const [answered, setAnswered] = useState(false);
	const [question, setQuestion] = useState(1);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [soundEnabled, setSoundEnabled] = useState(true);
	const [darkMode, setDarkMode] = useState(false);

	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;

	useFocusEffect(
		useCallback(() => {
			const loadSettings = async () => {
				const savedSoundEnabled = await AsyncStorage.getItem("soundEnabled");
				const savedDarkMode = await AsyncStorage.getItem("darkMode");

				if (savedSoundEnabled !== null) {
					setSoundEnabled(savedSoundEnabled === "true");
				}

				if (savedDarkMode !== null) {
					setDarkMode(savedDarkMode === "true");
				}
			};

			loadSettings();
		}, []),
	);

	const backgroundColor = darkMode ? "#111827" : "#F5F7FF";
	const cardColor = darkMode ? "#1F2937" : "white";
	const textColor = darkMode ? "white" : "#111";
	const descriptionColor = darkMode ? "#D1D5DB" : "#444";
	const exampleCardColor = darkMode ? "#374151" : "#EEF2FF";
	const answerColor = darkMode ? "#374151" : "#EEF2FF";
	const exitButtonColor = darkMode ? "#374151" : "#E5E7EB";
	const exitButtonTextColor = darkMode ? "white" : "#111";

	const playCorrectSound = async () => {
		if (!soundEnabled) return;

		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/sounds/correct.wav"),
		);

		await sound.playAsync();
	};

	const playWrongSound = async () => {
		if (!soundEnabled) return;

		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/sounds/wrong.wav"),
		);

		await sound.playAsync();
	};

	const playClickSound = async () => {
		if (!soundEnabled) return;

		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/sounds/click.wav"),
		);

		await sound.playAsync();
	};

	const handleAnswer = async (answer: string, isCorrect: boolean) => {
		if (answered) return;

		setSelectedAnswer(answer);
		setAnswered(true);

		if (isCorrect) {
			setScore((prevScore) => prevScore + 1);
			await playCorrectSound();
		} else {
			await playWrongSound();
		}
	};

	const cardStyle = [
		styles.card,
		{ backgroundColor: cardColor },
		isLandscape && styles.cardLandscape,
	];

	return (
		<ScrollView
			style={[styles.scroll, { backgroundColor }]}
			contentContainerStyle={[
				styles.container,
				{ backgroundColor },
				isLandscape && styles.containerLandscape,
			]}
			showsVerticalScrollIndicator={false}>
			{step === 1 && (
				<View style={cardStyle}>
					<Text style={[styles.title, isLandscape && styles.titleLandscape]}>
						Omówienie tematu
					</Text>

					<Text style={[styles.text, { color: descriptionColor }]}>
						W tej lekcji nauczysz się podstawowych zwrotów po angielsku.
					</Text>

					<Text style={[styles.example, { color: textColor }]}>
						• Hello → Cześć
					</Text>
					<Text style={[styles.example, { color: textColor }]}>
						• Thank you → Dziękuję
					</Text>
					<Text style={[styles.example, { color: textColor }]}>
						• Goodbye → Do widzenia
					</Text>

					<TouchableOpacity
						style={styles.button}
						onPress={async () => {
							await playClickSound();
							setStep(2);
						}}>
						<Text style={styles.buttonText}>Dalej</Text>
					</TouchableOpacity>
				</View>
			)}

			{step === 2 && (
				<View style={cardStyle}>
					<Text style={[styles.title, isLandscape && styles.titleLandscape]}>
						Przykłady
					</Text>

					<View
						style={[styles.exampleCard, { backgroundColor: exampleCardColor }]}>
						<Text style={styles.english}>Hello!</Text>
						<Text style={[styles.polish, { color: descriptionColor }]}>
							Cześć!
						</Text>
					</View>

					<View
						style={[styles.exampleCard, { backgroundColor: exampleCardColor }]}>
						<Text style={styles.english}>Thank you very much.</Text>
						<Text style={[styles.polish, { color: descriptionColor }]}>
							Bardzo dziękuję.
						</Text>
					</View>

					<View
						style={[styles.exampleCard, { backgroundColor: exampleCardColor }]}>
						<Text style={styles.english}>Goodbye my friend.</Text>
						<Text style={[styles.polish, { color: descriptionColor }]}>
							Do widzenia mój przyjacielu.
						</Text>
					</View>

					<TouchableOpacity
						style={styles.button}
						onPress={async () => {
							await playClickSound();
							setStep(3);
						}}>
						<Text style={styles.buttonText}>Rozpocznij quiz</Text>
					</TouchableOpacity>
				</View>
			)}

			{step === 3 && (
				<View style={cardStyle}>
					<Text style={[styles.title, isLandscape && styles.titleLandscape]}>
						Quiz
					</Text>

					{question === 1 && (
						<>
							<Text
								style={[
									styles.question,
									{ color: textColor },
									isLandscape && styles.questionLandscape,
								]}>
								Jak jest „Dziękuję” po angielsku?
							</Text>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Thank you" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Thank you", true)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Thank you
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Goodbye" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Goodbye", false)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Goodbye
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Hello" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Hello", false)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Hello
								</Text>
							</TouchableOpacity>
						</>
					)}

					{question === 2 && (
						<>
							<Text
								style={[
									styles.question,
									{ color: textColor },
									isLandscape && styles.questionLandscape,
								]}>
								Jak jest „Cześć” po angielsku?
							</Text>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Hello" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Hello", true)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Hello
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Please" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Please", false)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Please
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Goodbye" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Goodbye", false)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Goodbye
								</Text>
							</TouchableOpacity>
						</>
					)}

					{question === 3 && (
						<>
							<Text
								style={[
									styles.question,
									{ color: textColor },
									isLandscape && styles.questionLandscape,
								]}>
								Jak jest „Do widzenia” po angielsku?
							</Text>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Hello" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Hello", false)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Hello
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Goodbye" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Goodbye", true)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Goodbye
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[
									styles.answerButton,
									{ backgroundColor: answerColor },
									selectedAnswer === "Please" && styles.selectedAnswer,
								]}
								disabled={answered}
								onPress={() => handleAnswer("Please", false)}>
								<Text style={[styles.answerText, { color: textColor }]}>
									Please
								</Text>
							</TouchableOpacity>
						</>
					)}

					{answered && question < 3 && (
						<TouchableOpacity
							style={styles.button}
							onPress={async () => {
								await playClickSound();
								setQuestion(question + 1);
								setAnswered(false);
								setSelectedAnswer("");
							}}>
							<Text style={styles.buttonText}>Następne pytanie</Text>
						</TouchableOpacity>
					)}

					{answered && question === 3 && (
						<TouchableOpacity
							style={styles.button}
							onPress={async () => {
								await playClickSound();

								await AsyncStorage.setItem(
									"lesson1Completed",
									score === 3 ? "true" : "false",
								);

								setStep(4);
							}}>
							<Text style={styles.buttonText}>Zobacz wynik</Text>
						</TouchableOpacity>
					)}
				</View>
			)}

			{step === 4 && (
				<View style={cardStyle}>
					<Text style={[styles.title, isLandscape && styles.titleLandscape]}>
						Podsumowanie lekcji
					</Text>

					<Text style={[styles.summaryText, { color: descriptionColor }]}>
						Ukończyłeś pierwszą lekcję 🎉
					</Text>

					<Text style={styles.result}>Wynik quizu: {score}/3</Text>

					{score === 3 ? (
						<Text style={styles.successText}>✅ Lekcja została ukończona</Text>
					) : (
						<Text style={styles.failText}>❌ Musisz powtórzyć lekcję</Text>
					)}

					<TouchableOpacity
						style={styles.button}
						onPress={async () => {
							await playClickSound();

							setStep(1);
							setScore(0);
							setQuestion(1);
							setAnswered(false);
							setSelectedAnswer("");
						}}>
						<Text style={styles.buttonText}>Powtórz lekcję</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.exitButton, { backgroundColor: exitButtonColor }]}
						onPress={async () => {
							await playClickSound();
							router.push("/explore");
						}}>
						<Text
							style={[styles.exitButtonText, { color: exitButtonTextColor }]}>
							Wyjdź do lekcji
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scroll: {
		flex: 1,
	},

	container: {
		flexGrow: 1,
		padding: 25,
		justifyContent: "center",
	},

	containerLandscape: {
		paddingTop: 20,
		paddingBottom: 20,
	},

	card: {
		borderRadius: 24,
		padding: 25,
		width: "100%",
	},

	cardLandscape: {
		maxWidth: 650,
		alignSelf: "center",
		padding: 20,
	},

	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#4F46E5",
		marginBottom: 25,
		textAlign: "center",
	},

	titleLandscape: {
		fontSize: 24,
		marginBottom: 16,
	},

	text: {
		fontSize: 18,
		lineHeight: 28,
		marginBottom: 25,
	},

	example: {
		fontSize: 20,
		marginBottom: 16,
	},

	exampleCard: {
		padding: 16,
		borderRadius: 18,
		marginBottom: 14,
	},

	english: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#4F46E5",
		marginBottom: 8,
	},

	polish: {
		fontSize: 18,
	},

	button: {
		marginTop: 20,
		backgroundColor: "#4F46E5",
		paddingVertical: 14,
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
	},

	questionLandscape: {
		fontSize: 21,
		marginBottom: 18,
	},

	answerButton: {
		padding: 15,
		borderRadius: 16,
		marginBottom: 12,
	},

	selectedAnswer: {
		backgroundColor: "#C7D2FE",
		borderWidth: 2,
		borderColor: "#4F46E5",
	},

	answerText: {
		fontSize: 18,
		textAlign: "center",
	},

	summaryText: {
		fontSize: 22,
		textAlign: "center",
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
		paddingVertical: 14,
		borderRadius: 16,
		alignItems: "center",
	},

	exitButtonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
