import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Animated,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

export default function HomeScreen() {
	const [selectedLanguage, setSelectedLanguage] = useState("Angielski");
	const [open, setOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);

	const scaleAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(scaleAnim, {
					toValue: 1.08,
					duration: 900,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 900,
					useNativeDriver: true,
				}),
			]),
		).start();
	}, [scaleAnim]);

	const { width, height } = useWindowDimensions();
	const isLandscape = width > height;

	useFocusEffect(
		useCallback(() => {
			const loadSettings = async () => {
				const savedDarkMode = await AsyncStorage.getItem("darkMode");
				if (savedDarkMode !== null) {
					setDarkMode(savedDarkMode === "true");
				}
			};

			loadSettings();
		}, []),
	);

	const backgroundColor = darkMode ? "#111827" : "#4F46E5";
	const dropdownColor = darkMode ? "#1F2937" : "white";
	const dropdownTextColor = darkMode ? "white" : "#4F46E5";
	const optionBorderColor = darkMode ? "#374151" : "#EEE";

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
			<View style={styles.topButtons}>
				<TouchableOpacity
					style={[
						styles.button,
						{ backgroundColor: darkMode ? "#1F2937" : "white" },
					]}
					onPress={async () => {
						await playClickSound();
						router.push("/tabs2/config");
					}}>
					<Text
						style={[
							styles.buttonText,
							{ color: darkMode ? "white" : "#4F46E5" },
						]}>
						Konfiguracja
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.button,
						{ backgroundColor: darkMode ? "#1F2937" : "white" },
					]}
					onPress={async () => {
						await playClickSound();
						router.push("/tabs2/authors");
					}}>
					<Text
						style={[
							styles.buttonText,
							{ color: darkMode ? "white" : "#4F46E5" },
						]}>
						Autorzy
					</Text>
				</TouchableOpacity>
			</View>

			<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
				<Image
					source={{
						uri: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
					}}
					style={[styles.logo, isLandscape && styles.logoLandscape]}
				/>
			</Animated.View>

			<Text style={styles.title}>LinguaLearn</Text>
			<Text style={styles.subtitle}>Aplikacja do nauki języków obcych</Text>

			<View style={styles.languageContainer}>
				<Text style={styles.languageLabel}>Wybierz język</Text>

				<TouchableOpacity
					style={[styles.dropdown, { backgroundColor: dropdownColor }]}
					onPress={async () => {
						await playClickSound();
						setOpen(!open);
					}}>
					<Text style={[styles.dropdownText, { color: dropdownTextColor }]}>
						🇬🇧 {selectedLanguage}
					</Text>
				</TouchableOpacity>

				{open && (
					<View
						style={[styles.dropdownMenu, { backgroundColor: dropdownColor }]}>
						<TouchableOpacity
							style={[styles.option, { borderBottomColor: optionBorderColor }]}
							onPress={async () => {
								await playClickSound();
								setSelectedLanguage("Angielski");
								setOpen(false);
							}}>
							<Text style={[styles.optionText, { color: dropdownTextColor }]}>
								🇬🇧 Angielski
							</Text>
						</TouchableOpacity>

						<View
							style={[styles.option, { borderBottomColor: optionBorderColor }]}>
							<Text style={styles.disabledText}>
								🇩🇪 Niemiecki (Już wkrótce)
							</Text>
						</View>

						<View
							style={[styles.option, { borderBottomColor: optionBorderColor }]}>
							<Text style={styles.disabledText}>
								🇪🇸 Hiszpański (Już wkrótce)
							</Text>
						</View>
					</View>
				)}
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
		alignItems: "center",
		padding: 20,
		paddingTop: 70,
	},

	containerLandscape: {
		minHeight: 420,
		paddingTop: 30,
		paddingBottom: 30,
	},

	topButtons: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 35,
		zIndex: 20,
	},

	button: {
		backgroundColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 12,
		minWidth: 120,
		alignItems: "center",
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
		padding: 16,
		borderRadius: 14,
	},

	dropdownText: {
		fontSize: 16,
		fontWeight: "600",
	},

	dropdownMenu: {
		width: "100%",
		borderRadius: 14,
		marginTop: 10,
		overflow: "hidden",
		zIndex: 10,
	},

	option: {
		padding: 16,
		borderBottomWidth: 1,
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

	logoLandscape: {
		width: 90,
		height: 90,
		marginBottom: 15,
	},
});
