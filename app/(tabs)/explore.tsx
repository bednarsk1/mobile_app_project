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

export default function ProgressScreen() {
	const [lessonCompleted, setLessonCompleted] = useState(false);
	const [darkMode, setDarkMode] = useState(false);

	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;

	useFocusEffect(
		useCallback(() => {
			const loadData = async () => {
				const completed = await AsyncStorage.getItem("lesson1Completed");
				const savedDarkMode = await AsyncStorage.getItem("darkMode");

				setLessonCompleted(completed === "true");

				if (savedDarkMode !== null) {
					setDarkMode(savedDarkMode === "true");
				}
			};

			loadData();
		}, []),
	);

	const backgroundColor = darkMode ? "#111827" : "#F5F7FF";
	const cardColor = darkMode ? "#1F2937" : "white";
	const lockedCardColor = darkMode ? "#374151" : "#ECECEC";
	const textColor = darkMode ? "white" : "#111";
	const descriptionColor = darkMode ? "#D1D5DB" : "#555";
	const progressBackground = darkMode ? "#374151" : "#E5E7EB";

	const playClickSound = async () => {
		const soundEnabled = await AsyncStorage.getItem("soundEnabled");

		if (soundEnabled === "false") return;

		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/sounds/click.wav"),
		);

		await sound.playAsync();
	};

	return (
		<ScrollView
			style={[styles.scroll, { backgroundColor }]}
			contentContainerStyle={[
				styles.container,
				{ backgroundColor },
				isLandscape && styles.containerLandscape,
			]}
			showsVerticalScrollIndicator={false}>
			<Text style={[styles.title, isLandscape && styles.titleLandscape]}>
				Postęp nauki
			</Text>

			<View style={[styles.content, isLandscape && styles.contentLandscape]}>
				<View style={[styles.progressCard, { backgroundColor: cardColor }]}>
					<Text style={[styles.progressText, { color: descriptionColor }]}>
						Postęp kursu
					</Text>

					<Text style={styles.percent}>{lessonCompleted ? "33%" : "0%"}</Text>

					<View
						style={[
							styles.progressBarBackground,
							{ backgroundColor: progressBackground },
						]}>
						<View
							style={[
								styles.progressBarFill,
								{
									width: lessonCompleted ? "33%" : "0%",
								},
							]}
						/>
					</View>
				</View>

				<Text style={[styles.sectionTitle, { color: textColor }]}>Lekcje</Text>

				<TouchableOpacity
					style={[styles.lessonCard, { backgroundColor: cardColor }]}
					onPress={async () => {
						await playClickSound();
						router.push("/tabs2/lesson1");
					}}>
					<Text style={[styles.lessonTitle, { color: textColor }]}>
						Lekcja 1
					</Text>

					<Text style={[styles.lessonDescription, { color: descriptionColor }]}>
						Podstawowe zwroty po angielsku
					</Text>

					<Text
						style={
							lessonCompleted ? styles.lessonCompleted : styles.lessonAvailable
						}>
						{lessonCompleted ? "✅ Wykonano" : "▶ Rozpocznij lekcję"}
					</Text>
				</TouchableOpacity>

				<View
					style={[
						lessonCompleted ? styles.lessonCard : styles.lessonLockedCard,
						{
							backgroundColor: lessonCompleted ? cardColor : lockedCardColor,
						},
					]}>
					<Text style={[styles.lessonTitle, { color: textColor }]}>
						Lekcja 2
					</Text>

					<Text style={[styles.lessonDescription, { color: descriptionColor }]}>
						Przedstawianie się
					</Text>

					<Text
						style={
							lessonCompleted ? styles.lessonAvailable : styles.lessonLocked
						}>
						{lessonCompleted ? "▶ Odblokowano" : "🔒 Zablokowane"}
					</Text>
				</View>

				<View
					style={[
						styles.lessonLockedCard,
						{ backgroundColor: lockedCardColor },
					]}>
					<Text style={[styles.lessonTitle, { color: textColor }]}>
						Lekcja 3
					</Text>

					<Text style={[styles.lessonDescription, { color: descriptionColor }]}>
						Liczby i kolory
					</Text>

					<Text style={styles.lessonLocked}>🔒 Zablokowane</Text>
				</View>

				<TouchableOpacity
					style={styles.resetButton}
					onPress={async () => {
						await playClickSound();
						await AsyncStorage.removeItem("lesson1Completed");
						setLessonCompleted(false);
					}}>
					<Text style={styles.resetButtonText}>Reset postępu</Text>
				</TouchableOpacity>
			</View>
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
		paddingTop: 80,
		paddingBottom: 80,
	},

	containerLandscape: {
		paddingTop: 25,
		paddingBottom: 35,
	},

	content: {
		width: "100%",
	},

	contentLandscape: {
		maxWidth: 650,
		alignSelf: "center",
	},

	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#4F46E5",
		marginBottom: 30,
	},

	titleLandscape: {
		fontSize: 26,
		marginBottom: 18,
		textAlign: "center",
	},

	progressCard: {
		padding: 22,
		borderRadius: 20,
		marginBottom: 25,
	},

	progressText: {
		fontSize: 18,
		marginBottom: 10,
	},

	percent: {
		fontSize: 36,
		fontWeight: "bold",
		color: "#4F46E5",
		marginBottom: 18,
	},

	progressBarBackground: {
		height: 14,
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
		marginBottom: 16,
	},

	lessonCard: {
		padding: 18,
		borderRadius: 18,
		marginBottom: 14,
	},

	lessonLockedCard: {
		padding: 18,
		borderRadius: 18,
		marginBottom: 14,
		opacity: 0.7,
	},

	lessonTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},

	lessonDescription: {
		fontSize: 16,
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
		marginTop: 16,
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
