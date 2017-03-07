/**
 * Created by fupingfu on 2017/3/3.
 */
import React from 'react';
import {
  Dimensions
} from 'react-native'

const appId = "30094";
const secret = "8f00d7d21c6645719b4d4f47713b4030";

export default class BaseComponent extends React.Component {
  constructor() {
    super();
    this.system = {
      screenWidth: Dimensions.get('window').width,
      screenHeight:Dimensions.get('window').height
    }
  }

  startRequest(url, data, callBack) {
    let realUrl = this.createUrl(url, data);

    fetch(realUrl).then((response)=>{
      if(response.ok) {
        return response.json();
      } else {
        return {"code":1};
      }
    }).then((data) => {
      callBack(data)
    })
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
}