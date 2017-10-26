/**
 * Created by fupingfu on 2017/1/23.
 */
import React from 'react';
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';

import BaseComponent from "./base/BaseComponent"
import ComponentDic from "./base/ComponentDic"

export default class SplashPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      "isDirector": false
    };
  }

  componentDidMount() {
    let scheme = null;
    if (this.props != null) {
      scheme = this.props.scheme;
    }

    console.log('scheme = ' + scheme);
    if (scheme != null) {
      let i = scheme.indexOf("?");
      console.log('scheme = ' + i);
      let params = "";
      if (i <= 5) {
        i = scheme.length;
      } else {
        params = scheme.substring(i + 1, scheme.length);
      }
      let schemeStr = scheme.substring(5, i);

      console.log('rn scheme = ' + schemeStr + ", params = " + params);
      let array = schemeStr.split("/");
      if (array.length < 2) {
        console.log('scheme错误');
        return
      }

      let platform = array[0];
      let pageName = array[1];
      let obj = "{}";
      if (params != null && params.length > 0) {
        obj = params;
      }
      if (pageName == "main") {
        setTimeout(() => {
          this.gotoPage(pageName, JSON.parse(obj));
        }, 1500);
      } else {
        this.gotoPage(pageName, JSON.parse(obj));
      }
    }
  }

  gotoPage(pageName, params) {
    const {navigator} = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (this.state.isDirector) {
      return
    }
    let component = ComponentDic.getComponent(pageName);
    if (component == null) {
      return;
    }

    if (navigator) {
      navigator.replacePrevious({
        name: 'MainComponent',
        component: component,
        params: params
      });
    }
  }

  _gotoMainPage() {
    const {navigator} = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    let component = ComponentDic.getComponent("main");
    if (navigator) {
      navigator.push({
        name: 'MainComponent',
        component: component
      });
    }
  }

  render() {
    let url = "http://www.oneside.com";
    return (
      <View style={styles.container}>
        <View style={{flex:1, justifyContent:'center'}}>
          <Image style={styles.logo} source={require('./images/ic_logo.png')}/>
          <Text style={{fontSize:20, marginTop: 30, marginBottom: 100}}>在你身边，永远陪伴</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={{fontSize: 14}}>{url}</Text>
        </View>
        <View style={styles.test}>
          <TouchableOpacity style={{height: 30, width:60, marginRight:10}} onPress={()=>{this.gotoPage("main", {})}}>
            <Text>gotoMain</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height: 30, width:60}} onPress={()=>this.gotoPage("test", {})}>
            <Text>测试</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    //this.timer && clearTimeout(this.timer);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 142,
    height: 108,
    marginLeft: 20,
    resizeMode: Image.resizeMode.contain
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60
  },

  test: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60
  }
});