import * as React from 'react';
import { Text, View } from 'react-native';

export default class MyMap extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: '#fff' }}>Mapbox map not available!</Text>
      </View>
    );
  }
}
