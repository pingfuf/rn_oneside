/**
 * Created by fupingfu on 2017/1/23.
 */
import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import BaseComponent from './BaseComponent'

export default class PicPage extends BaseComponent {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  constructor() {
    super();
  }

  testPressed() {
    alert("test")
  }

  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableOpacity >
          <Text>点我进入下一场景</Text>
        </TouchableOpacity >
        <TouchableHighlight>
          <Text>点我返回上一场景</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const style = {
  main: {

  }
}