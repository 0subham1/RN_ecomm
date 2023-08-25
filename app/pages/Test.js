import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import style from '../css/style';
import { Button } from 'react-native-paper';

const Test = () => {
  const animation = useSharedValue(10);

  const animatedStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: animation.value}]};
  });

  const handleAnimeGesture = useAnimatedGestureHandler({
    onActive: e => {
      animation.value = e.translateX;
    },
    onEnd: () => {},
  });

  return (
    <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
      <View
        style={{
          height: 50,
          backgroundColor: '#ffbf80',
          width: 300,
          padding: 10,
          margin: 10,
        }}>
        <Animated.View
          style={[
            {
              height: 30,
              width: 30,
              position: 'absolute',
              left: 10,
              backgroundColor: 'red',
            },
            animatedStyle,
          ]}></Animated.View>
      </View>

      <Button onPress={()=>animation.value=100} >click</Button>
    </View>
  );
};

export default Test;
