import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { wrapperZoomImages, ImageInWraper } from "react-native-zoom-lightbox";

class ImageZoom extends PureComponent {
  static propTypes = {
    getOpacity: PropTypes.func,
    captureCarouselItem: PropTypes.func,
    indexState: PropTypes.number,
    open: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      arrayImages: props.images.map((image, index) => ({
        url: image,
        index: index,
      })),
    };
  }

  render() {
    const { getOpacity, captureCarouselItem, indexState, open } = this.props;
    const { arrayImages } = this.state;
    return (
      <View style={{ alignItems: "center" }}>
        {arrayImages.map((item) => (
          <ImageInWraper
            key={item.index}
            open={open}
            indexState={indexState}
            getOpacity={getOpacity}
            captureCarouselItem={captureCarouselItem}
            index={item.index}
            url={item.url}
            style={{ marginBottom: 20 }}
          />
        ))}
      </View>
    );
  }
}

export default wrapperZoomImages(ImageZoom);
