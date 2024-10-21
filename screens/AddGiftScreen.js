import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TextInput, Button, Image } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AddGiftScreen({ route }) {
  const { item } = route.params;
  const [giftName, setGiftName] = useState("");
  const { addGift } = useContext(PeopleContext);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setPhoto(data.uri); // Set the photo URI to display
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const saveGift = () => {
    if (giftName && photo) {
      const gift = { name: giftName, photo };
      addGift(item.id, gift);
      navigation.goBack();
    } else {
      alert("Please enter a gift name and take a photo before saving.");
    }
  };

  // If permission is not granted
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera, please allow access</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ideas for {item.name}</Text>
      <View style={styles.itemGroup}>
        <Text>Gift Name</Text>
        <TextInput
          style={styles.itemInput}
          value={giftName}
          onChangeText={setGiftName}
        />
      </View>
      <View style={styles.cameraGroup}>
        {!photo ? (
          <CameraView
            style={{ flex: 1 }}
            facing={facing}
            ref={(ref) => setCameraRef(ref)}
          >
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.flipText}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <Text style={styles.captureText}> Take Picture </Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          // If a photo is taken, display the preview
          <View style={styles.previewContainer}>
            <Image source={{ uri: photo }} style={styles.imagePreview} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={() => setPhoto(null)} // Reset photo to retake
              >
                <Text style={styles.captureText}> Retake </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Save" onPress={saveGift} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    fontSize: 28,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  itemGroup: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemInput: {
    borderBottomWidth: 1,
    borderColor: "lightblue",
    padding: 10,
    marginVertical: 10,
  },
  cameraGroup: {
    flex: 1,
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  flipButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  flipText: {
    fontSize: 18,
    color: "black",
  },
  captureButton: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  captureText: {
    fontSize: 18,
    color: "black",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginBottom: 20,
  },
});