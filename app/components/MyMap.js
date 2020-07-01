import * as React from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';

export default class MyMap extends React.Component {
  render() {
    return (
      <Mapbox.MapView
        styleURL="mapbox://styles/jhuskey/cjabpqolp3lf02so534xe4q9g"
        style={{ flex: 1 }}
        {...this.props}
      />
    );
  }
}