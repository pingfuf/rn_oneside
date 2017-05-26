/**
 * Created by fupingfu on 2017/3/9.
 */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import BaseComponent from './BaseComponent'

export default class StoryDetailPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    super.startRequest("http://route.showapi.com/955-2", {id: this.props.id}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let body = data.showapi_res_body;
        if (body) {
          let text = data.showapi_res_body.text;
          let reg = new RegExp("&nbsp;", "g");
          text = text.replace(reg, "  ");
          this.setState({
            text: text
          })
        }
      }
    })
  }

  _pressButton() {
    const {navigator} = this.props;
    if(navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
      navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {super.createTitleView(this.props.title)}
        <ScrollView>
          <Text style={styles.content}>
            {this.state.text}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  content: {
    color:'#000000',
    margin: 15
  }
});