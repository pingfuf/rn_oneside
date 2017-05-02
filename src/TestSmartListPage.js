/**
 * Created by fupingfu on 2017/5/2.
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
import PullToRefreshListView from './list/PullToRefreshListView';

export default class TestSmartListPage extends BaseComponent {
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
      <PullToRefreshListView
        style={styles.container}

        />
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