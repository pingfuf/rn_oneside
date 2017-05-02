/**
 * Created by fupingfu on 2017/4/27.
 */
import React from 'react';
import {
  ListView,
  NativeModules,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import BaseComponent from './BaseComponent'

export default class TestLLL extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      data: {
        title:"32",
        age: 20
      }
    };
  }

  render() {
    return (
      <View style={styles.container}></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb00FF',
  }
});