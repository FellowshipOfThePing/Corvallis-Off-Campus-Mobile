import React from "react";
import { View, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import * as Haptics from "expo-haptics";

import colors from "../config/colors";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const AnimatedIcon = Animatable.createAnimatableComponent(FontAwesome);

class Heart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: this.props.saved,
    };

    this.lastPress = 0;
  }

  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref;
  };

  animateIcon = () => {
    const { saved } = this.state;
    this.largeAnimatedIcon.stopAnimation();

    if (saved) {
      this.largeAnimatedIcon
        .bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut());
      this.smallAnimatedIcon.pulse(200);
    } else {
      this.largeAnimatedIcon
        .bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut();
          this.smallAnimatedIcon.bounceIn();
        })
        .then(() => {
          if (!saved) {
            this.setState((prevState) => ({ saved: !prevState.saved }));
          }
        });
    }
  };

  handleOnPressLike = () => {
    this.smallAnimatedIcon.bounceIn();
    this.setState((prevState) => ({ saved: !prevState.saved }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    this.props.onPress();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={this.handleOnPressLike}>
          <AnimatedIcon
            ref={this.handleSmallAnimatedIconRef}
            style={styles.icon}
            name={this.state.saved ? "heart" : "heart-o"}
            size={this.props.size || 30}
            color={this.state.saved ? colors.primary : colors.black}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Heart;
