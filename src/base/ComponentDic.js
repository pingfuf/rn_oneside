/**
 * Created by fupingfu on 2017/8/30.
 */
import React from 'react';

import MainPage from '../MainPage'
import StoryPage from '../StoryPage'
import PicPage from '../PicPage'
import PicDetailPage from "../PicDetailPage"
import StoryDetailPage from "../StoryDetailPage"
import TestPage from "../TestPage";

export default class ComponentDic extends React.Component {

  static getComponent(name) {
    let component;
    if (name == "main") {
      component = MainPage;
    } else if (name == "story") {
      component = StoryPage;
    } else if (name == "test") {
      component = TestPage;
    } else if (name == "pic") {
      component = PicPage;
    } else if (name == "picDetail") {
      component = PicDetailPage;
    } else if (name == "storyDetail") {
      component = StoryDetailPage;
    }

    return component;
  }
}