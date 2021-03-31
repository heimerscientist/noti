import client from "./client";
import * as Device from "expo-device";

const register = (pushToken) =>
  client.post("/expoPushTokens", {
    token: pushToken,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion,
  });

export default {
  register,
};
