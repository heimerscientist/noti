import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

import expoPushTokensApi from "../api/expoPushTokens";

export default useNotifications = (responseListener) => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    if (responseListener) {
      Notifications.addNotificationResponseReceivedListener(responseListener);
      return () => {
        Notifications.removeNotificationSubscription(responseListener);
      };
    }
  }, []);

  async function registerForPushNotificationsAsync() {
    console.log(Platform);
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      expoPushTokensApi.register(token);
    } else {
      // alert("Must use physical device for Push Notifications");
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }
};
