import Constants from "expo-constants";
import {Camera} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';


class UserPermissions {
  getCameraPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status != "granted") {
        alert("We need permission to use your camera roll if you'd like to use this feature.");
      }
    }
  };
}

export default new UserPermissions();
