import React from "react";
import { View, StyleSheet } from "react-native";
import IconWithText from "./IconWithText";

function IconRow({ listing, size = 20, fullSize, style }) {
  return (
    <View style={[styles.iconRow, style]}>
      <IconWithText
        iconName="bed"
        quantity={listing.beds}
        textValue={"bd"}
        visible={!!listing.beds}
      />
      <IconWithText
        iconName="bath"
        quantity={listing.baths}
        textValue={"ba"}
        visible={!!listing.baths}
      />
      {fullSize && (
        <>
          <IconWithText
            iconName="ruler-combined"
            quantity={listing.sqft}
            textValue={"sqft"}
            visible={!!listing.sqft}
          />
          <IconWithText
            iconName="walking"
            quantity={Math.round(listing.walk_to_campus_minutes)}
            textValue={"min"}
            visible={listing.walk_to_campus_minutes < 30}
          />
          <IconWithText
            iconName="car-side"
            quantity={Math.round(listing.drive_to_campus_minutes)}
            textValue={"min"}
            visible={listing.walk_to_campus_minutes > 30}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginHorizontal: 9,
  },
});

export default IconRow;
