/**
 * Created by fupingfu on 2017/2/23.
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const data = {

}

export default class StoryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _pressButton() {
    const {navigator} = this.props;
    if (navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
      navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>

        </View>
        <TouchableHighlight onPress={this._pressButton.bind(this)}>
          <Text>点我跳回去</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb00FF',
  },

  top: {
    flex: 1,
    height: 50
  }
});