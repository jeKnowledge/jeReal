import AsyncStorageLib from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
    await AsyncStorageLib.setItem("token", token);
  };
  
  export const getTokenFromStorage = async () => {
    const token = await AsyncStorageLib.getItem("token");
    return token;
  };