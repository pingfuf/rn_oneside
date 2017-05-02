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

import MainComponent from "./MainPage";
import TestPage from "./TestPage";

export default class FirstScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.timer = setTimeout(() => {
    //   console.log('把一个定时器的引用挂在this上');
    //   this._gotoMainPage();
    // }, 1500);
    //alert(this.props.scheme);
  }

  _pressButton() {
    alert("tempppp")
  }

  _gotoMainPage() {
    const {navigator} = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if (navigator) {
      navigator.push({
        name: 'MainComponent',
        component: MainComponent
      });
    }
  }
  _gotoTest() {
    const {navigator} = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props

    if (navigator) {
      navigator.push({
        name: 'TestPage',
        component: TestPage
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
          <TouchableOpacity style={{height: 30, width:60, marginRight:10}} onPress={()=>{this._gotoMainPage()}}>
            <Text>gotoMain</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{height: 30, width:60}} onPress={()=>this._gotoTest()}>
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