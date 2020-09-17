import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

class Heart extends React.Component {
  constructor() {
    super();
  }

  handleOnPressLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    this.props.onPress();
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.colors !== nextProps.colors ||
      this.props.saved !== nextProps.saved
    );
  }

  render() {
    const { saved, onPress, size, colors } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          delayPressIn={0}
          activeOpacity={1}
          onPress={() => this.handleOnPressLike()}
        >
          <FontAwesome
            style={styles.icon}
            name={saved ? "heart" : "heart-o"}
            size={size ? size : 35}
            color={saved ? colors.primary : colors.black}
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

export default React.memo(Heart);
