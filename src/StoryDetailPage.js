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
import BaseComponent from './base/BaseComponent'

export default class StoryDetailPage extends BaseComponent {
  constructor(props) {
    super(props);
    let text = this.props.text;
    if (text == null) {
      text = "";
    }

    this.state = {
      text: text
    };
  }

  componentDidMount() {
    if (this.props.type == 0) {
      super.startRequest("http://route.showapi.com/955-2", {id: this.props.id}, (data) => {
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