import React from "react";
import { View, StyleSheet } from "react-native";
import IconWithText from "./IconWithText";

class IconRow extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.colors !== nextProps.colors;
  }

  render() {
    const { listing, size, fullSize, style, colors } = this.props;
    return (
      <View style={[styles.iconRow, style]}>
        <IconWithText
          iconName="bed"
          quantity={listing.beds}
          textValue={"bd"}
          visible={!!listing.beds}
          colors={colors}
        />
        <IconWithText
          iconName="bath"
          quantity={listing.baths}
          textValue={"ba"}
          visible={!!listing.baths}
          colors={colors}
        />
        {fullSize && (
          <>
            <IconWithText
              iconName="ruler-combined"
              quantity={listing.sqft}
              textValue={"sqft"}
              visible={!!listing.sqft}
              colors={colors}
            />
            <IconWithText
              iconName="walking"
              quantity={Math.round(listing.walk_to_campus_minutes)}
              textValue={"min"}
              visible={listing.walk_to_campus_minutes <= 20}
              colors={colors}
            />
            <IconWithText
              iconName="car-side"
              quantity={Math.round(listing.drive_to_campus_minutes)}
              textValue={"min"}
              visible={listing.walk_to_campus_minutes > 20}
              colors={colors}
            />
          </>
        )}
      </View>
    );
  }
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
