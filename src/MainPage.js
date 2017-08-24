/**
 * Created by fupingfu on 2017/1/23.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'
import BaseComponent from './base/BaseComponent'
import StoryPage from './StoryPage'
import PicPage from './PicPage'

export default class MainComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'home'
    };
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="故事汇"
          titleStyle={{fontSize:13}}
          renderIcon={() =>
            <Image style={styles.img} source={require('./images/ic_fit_normal.png')} />
          }
          renderSelectedIcon={() =>
            <Image style={styles.img} source={require('./images/ic_fit_pressed.png')} />
          }
          badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}>

          {/* 这样传递navigator */}
          <StoryPage {...this.props}/>

        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="漫画图片"
          titleStyle={{fontSize:13}}
          renderIcon={() =>
            <Image style={styles.img} source={require('./images/ic_coupon_color_user.png')}/>
          }
          renderSelectedIcon={() =>
            <Image style={styles.img} source={require('./images/ic_coupon_color.png')} />
          }
          renderBadge={() => <Text>3</Text>}
          onPress={() => this.setState({ selectedTab: 'profile' })}>

          <PicPage title="PicPage" {...this.props} />

        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 20,
    width: 22
  }
});