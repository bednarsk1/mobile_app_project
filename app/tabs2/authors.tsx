import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

const playClickSound = async () => {
	const soundEnabled = await AsyncStorage.getItem("soundEnabled");

	if (soundEnabled === "false") return;

	const { sound } = await Audio.Sound.createAsync(
		require("../../assets/sounds/click.wav"),
	);

	await sound.playAsync();
};

export default function AuthorsScreen() {
	const [darkMode, setDarkMode] = useState(false);

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

	const backgroundColor = darkMode ? "#111827" : "#F5F7FF";
	const cardColor = darkMode ? "#1F2937" : "white";
	const authorCardColor = darkMode ? "#374151" : "#EEF2FF";
	const textColor = darkMode ? "white" : "#111";
	const descriptionColor = darkMode ? "#D1D5DB" : "#555";

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
				Informacje o autorach
			</Text>

			<View style={[styles.content, isLandscape && styles.contentLandscape]}>
				<View style={[styles.card, { backgroundColor: cardColor }]}>
					<Text style={styles.label}>Autorzy aplikacji</Text>

					<View
						style={[styles.authorCard, { backgroundColor: authorCardColor }]}>
						<Text style={styles.authorName}>Piotr Bednarski</Text>
						<Text style={[styles.authorIndex, { color: descriptionColor }]}>
							Nr albumu: 15240
						</Text>
					</View>

					<View
						style={[styles.authorCard, { backgroundColor: authorCardColor }]}>
						<Text style={styles.authorName}>Jakub Opoka</Text>
						<Text style={[styles.authorIndex, { color: descriptionColor }]}>
							Nr albumu: 15222
						</Text>
					</View>
				</View>

				<View style={styles.logoBox}>
					<Image
						source={require("../../assets/images/download.png")}
						style={[styles.logo, isLandscape && styles.logoLandscape]}
						resizeMode='contain'
					/>

					<Text style={styles.ideis}>IDEIS</Text>
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
		alignItems: "center",
	},

	containerLandscape: {
		paddingTop: 20,
		paddingBottom: 20,
	},

	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#4F46E5",
		marginBottom: 30,
		textAlign: "center",
	},

	titleLandscape: {
		fontSize: 24,
		marginBottom: 20,
	},

	content: {
		width: "100%",
		alignItems: "center",
	},

	contentLandscape: {
		maxWidth: 500,
		alignSelf: "center",
	},

	card: {
		width: "100%",
		padding: 25,
		borderRadius: 18,
		marginBottom: 25,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 3,
	},

	label: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#4F46E5",
		textAlign: "center",
	},

	authorCard: {
		padding: 15,
		borderRadius: 12,
		marginBottom: 12,
	},

	authorName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#4F46E5",
		marginBottom: 4,
	},

	authorIndex: {
		fontSize: 15,
	},

	logoBox: {
		alignItems: "center",
	},

	logo: {
		width: 220,
		height: 220,
		marginBottom: 20,
	},

	logoLandscape: {
		width: 110,
		height: 110,
		marginBottom: 10,
	},

	ideis: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#4F46E5",
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
