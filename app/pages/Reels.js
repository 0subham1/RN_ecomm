import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import style from "../css/style";
import { Button } from "react-native-paper";

const Reels = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={style.container}>
      <Video
        ref={video}
        style={styles.backgroundVideo}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View>
        <Button
        mode="contained-tonal"
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          {status.isPlaying ? "Pause" : "Play"}
        </Button>
        <Text>Testing video playing features</Text>
      </View>
    </View>
  );
};
var styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Reels;

