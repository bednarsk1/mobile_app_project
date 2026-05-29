import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowBanner: true,
		shouldShowList: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});
export default function ConfigScreen() {
	const [notifications, setNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [soundEnabled, setSoundEnabled] = useState(true);

	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;

	useEffect(() => {
		const loadSettings = async () => {
			const savedNotifications = await AsyncStorage.getItem("notifications");
			const savedDarkMode = await AsyncStorage.getItem("darkMode");
			const savedSoundEnabled = await AsyncStorage.getItem("soundEnabled");

			if (savedNotifications !== null) {
				setNotifications(savedNotifications === "true");
			}

			if (savedDarkMode !== null) {
				setDarkMode(savedDarkMode === "true");
			}

			if (savedSoundEnabled !== null) {
				setSoundEnabled(savedSoundEnabled === "true");
			}
		};

		loadSettings();
	}, []);

	const changeNotifications = async (value: boolean) => {
		await playClickSound();

		setNotifications(value);
		await AsyncStorage.setItem("notifications", value.toString());

		if (value) {
			await scheduleNotification();
		} else {
			await Notifications.cancelAllScheduledNotificationsAsync();
		}
	};

	const changeDarkMode = async (value: boolean) => {
		await playClickSound();
		setDarkMode(value);
		await AsyncStorage.setItem("darkMode", value.toString());
	};

	const changeSoundEnabled = async (value: boolean) => {
		await playClickSound();
		setSoundEnabled(value);
		await AsyncStorage.setItem("soundEnabled", value.toString());
	};

	const scheduleNotification = async () => {
		const { status } = await Notifications.requestPermissionsAsync();

		if (status !== "granted") return;

		await Notifications.cancelAllScheduledNotificationsAsync();

		await Notifications.scheduleNotificationAsync({
			content: {
				title: "LinguaLearn 📚",
				body: "Czas na naukę języka angielskiego!",
			},
			trigger: {
				type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: 10,
				repeats: false,
			},
		});
	};

	const backgroundColor = darkMode ? "#111827" : "#F5F7FF";
	const cardColor = darkMode ? "#1F2937" : "white";
	const textColor = darkMode ? "white" : "#111";
	const descriptionColor = darkMode ? "#D1D5DB" : "#555";

	const playClickSound = async () => {
		if (!soundEnabled) return;

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
				Konfiguracja
			</Text>

			<View style={[styles.content, isLandscape && styles.contentLandscape]}>
				<View style={[styles.optionBox, { backgroundColor: cardColor }]}>
					<View style={styles.optionTextBox}>
						<Text style={[styles.optionText, { color: textColor }]}>
							Powiadomienia
						</Text>

						<Text
							style={[styles.optionDescription, { color: descriptionColor }]}>
							Przypomnienia o codziennej nauce
						</Text>
					</View>

					<Switch value={notifications} onValueChange={changeNotifications} />
				</View>

				<View style={[styles.optionBox, { backgroundColor: cardColor }]}>
					<View style={styles.optionTextBox}>
						<Text style={[styles.optionText, { color: textColor }]}>
							Tryb ciemny
						</Text>

						<Text
							style={[styles.optionDescription, { color: descriptionColor }]}>
							Zmiana wyglądu ekranu konfiguracji
						</Text>
					</View>

					<Switch value={darkMode} onValueChange={changeDarkMode} />
				</View>

				<View style={[styles.optionBox, { backgroundColor: cardColor }]}>
					<View style={styles.optionTextBox}>
						<Text style={[styles.optionText, { color: textColor }]}>
							Dźwięki aplikacji
						</Text>

						<Text
							style={[styles.optionDescription, { color: descriptionColor }]}>
							Dźwięki poprawnych i błędnych odpowiedzi
						</Text>
					</View>

					<Switch value={soundEnabled} onValueChange={changeSoundEnabled} />
				</View>
			</View>

			<TouchableOpacity
				style={styles.backButton}
				onPress={async () => {
					await playClickSound();
					router.push("/");
				}}>
				<Text style={styles.backButtonText}>←</Text>
			</TouchableOpacity>
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
		paddingBottom: 100,
	},

	containerLandscape: {
		paddingTop: 30,
		paddingBottom: 40,
		justifyContent: "center",
	},

	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#4F46E5",
		marginBottom: 30,
	},

	titleLandscape: {
		fontSize: 26,
		marginBottom: 18,
		textAlign: "center",
	},

	content: {
		width: "100%",
	},

	contentLandscape: {
		maxWidth: 700,
		alignSelf: "center",
	},

	optionBox: {
		padding: 18,
		borderRadius: 14,
		marginBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 12,
	},

	optionTextBox: {
		flex: 1,
	},

	optionText: {
		fontSize: 18,
		fontWeight: "600",
	},

	optionDescription: {
		fontSize: 14,
		marginTop: 4,
	},

	backButton: {
		backgroundColor: "#4F46E5",
		paddingVertical: 10,
		paddingHorizontal: 18,
		borderRadius: 12,
		marginTop: 25,
		width: 55,
		height: 55,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-end",
	},

	backButtonText: {
		color: "white",
		fontSize: 28,
		fontWeight: "bold",
	},
});
