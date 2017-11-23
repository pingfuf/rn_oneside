/**
 * Created by fupingfu on 2017/8/25.
 */
import React from 'react';
import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import BaseComponent from '../../base/BaseComponent'
import TestListPage from './TestListPageRemote'
import TestLLL from './TestLLL';
import PullToRefreshListViewDemo from './PullToRefreshListViewDemo'

export default class StudyTest extends TestLLL {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _pressButton() {
    const {navigator} = this.props;
    if(navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
      navigator.pop();
    }
  }

  gotoNativeTest() {
    //alert("test");
    NativeModules.NavigatorModule.startActivity("com.oneside.ui.CustomQuestionsDetailsActivity", "3");
  }

  gotoPage(component) {
    const {navigator} = this.props;

    // let component = TestListPage;
    // if (type == 1) {
    //   component = TestListPage;
    // } else if (type == 2) {
    //   component = TestRefreshPage;
    // }
    if(navigator) {
      navigator.push({
        name:"TestListPage",
        component: component
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>sdfsdfsdfsdf</Text>
        <TouchableHighlight style={styles.item} onPress={()=>this._pressButton()}>
          <Text>点我跳回去</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.item} onPress={()=>this.gotoNativeTest()}>
          <Text>跳转到Native界面</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.item} onPress={()=>this.gotoPage(TestListPage)}>
          <Text>跳转到List界面</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.item} onPress={()=>this.gotoPage(TestLLL)}>
          <Text>跳转到List界面ss</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.item} onPress={()=>this.gotoPage(PullToRefreshListViewDemo)}>
          <Text>跳转到PullToRefresh界面</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb00FF',
  },
  item: {
    height: 60,
    width: 220
  }
});