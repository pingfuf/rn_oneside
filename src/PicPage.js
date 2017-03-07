/**
 * Created by fupingfu on 2017/1/23.
 */
import React, {Component, PropTypes} from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import FirstScene from './SplashPage'

export default class PicPage extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight>
          <Text>点我进入下一场景</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>点我返回上一场景</Text>
        </TouchableHighlight>
      </View>
    )
  }
}