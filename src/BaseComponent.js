/**
 * Created by fupingfu on 2017/3/3.
 */
import React from 'react';
import {
  BackAndroid,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
//import DeviceInfo from 'react-native-device-info'

const appId = "30094";
const secret = "8f00d7d21c6645719b4d4f47713b4030";

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);

    this.system = {
      screenWidth: Dimensions.get('window').width,
      screenHeight: Dimensions.get('window').height
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackPressed.bind(this));
    }
  }

  startRequest(url, data, callBack) {
    let realUrl = this.createUrl(url, data);

    fetch(realUrl).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {"code": 1};
      }
    }).then((data) => {
      callBack(data)
    }).done();
  }

  /**
   * 创建URL
   *
   * @param url  url路径
   * @param data 请求参数
   * @returns {realUrl}
   */
  createUrl(url, data) {
    let realUrl = url;
    realUrl += "?showapi_appid=" + appId;
    realUrl += "&showapi_sign=" + secret;
    if (data != null && typeof data == 'object') {
      for (let key in data) {
        realUrl += "&" + key + "=" + data[key];
      }
    }

    return realUrl;
  }

  createTitleView() {
    return this.createTitleView("");
  }

  /**
   * 创建title
   * @returns {XML}
   */
  createTitleView(title) {
    return this.createTitleView(title, null);
  }

  createTitleView(title, component) {
    return (
      <View style={[styles.title, {width: this.system.screenWidth}]}>
        <TouchableOpacity onPress={()=>this.onBackPressed()}>
          <Image source={require('./images/ic_arrow_left_black.png')} style={styles.back}/>
        </TouchableOpacity>
        <Text style={styles.content} numberOfLines={1}>{title}</Text>
        {component}
      </View>
    );
  }

  /**
   * 处理返回按键
   */
  onBackPressed() {
    const {navigator} = this.props;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
    }
  }
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fd6e37',
    alignItems: 'center',
  },
  back: {
    height: 22,
    width: 9,
    marginLeft: 15,
    marginRight: 15
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 15,
    color: '#ffffff',
    alignItems: 'center'
  }
});