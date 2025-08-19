import React, { useState } from "react";
import { TouchableOpacity, ActivityIndicator, Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const FileDownloader = ({ fileUrl, fileName, children } : any) => {
  const [downloading, setDownloading] = useState(false);

  const downloadFile = async () => {
    setDownloading(true);
    try {
      let fileUri;

      if (Platform.OS === "android") {
        fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      } else {
        fileUri = `${FileSystem.documentDirectory}${fileName}`;
      }

      const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const newUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            "application/pdf" // Change MIME type if needed
          );

          const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
          await FileSystem.writeAsStringAsync(newUri, fileContent, { encoding: FileSystem.EncodingType.Base64 });

          Alert.alert("Download complete!", `File saved to: Downloads folder`);
        } else {
          Alert.alert("Permission denied", "Unable to save the file to Downloads.");
        }
      } else {
        Alert.alert("Download complete!", `File saved to: ${uri}`);
      }

    //   if (await Sharing.isAvailableAsync()) {
    //     await Sharing.shareAsync(uri);
    //   }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "File download failed.");
    }
    setDownloading(false);
  };

  return (
    <TouchableOpacity onPress={downloadFile} disabled={downloading}>
      {downloading ? <ActivityIndicator color="blue" /> : children}
    </TouchableOpacity>
  );
};

