import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import ThemeContext from "../theme/context";

function ListItem({
  title,
  image,
  IconComponent,
  subTitle,
  onPress,
  renderRightActions,
  style,
}) {
  const { colors } = useContext(ThemeContext);
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableWithoutFeedback underlayColor={colors.medium} onPress={onPress}>
        <View
          style={[styles.container, { backgroundColor: colors.white, style }]}
        >
          {IconComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={{ color: colors.medium }}>{subTitle}</AppText>
            )}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={25}
            color={colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
