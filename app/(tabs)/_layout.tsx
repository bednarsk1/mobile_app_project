import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	const playClickSound = async () => {
		const soundEnabled = await AsyncStorage.getItem("soundEnabled");

		if (soundEnabled === "false") return;

		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/sounds/click.wav"),
		);

		await sound.playAsync();
	};

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: "Start",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name='house.fill' color={color} />
					),
				}}
				listeners={{
					tabPress: () => {
						playClickSound();
					},
				}}
			/>

			<Tabs.Screen
				name='explore'
				options={{
					title: "Ucz się",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name='graduationcap.fill' color={color} />
					),
				}}
				listeners={{
					tabPress: () => {
						playClickSound();
					},
				}}
			/>
		</Tabs>
	);
}
