/**
 * Created by fupingfu on 2017/8/30.
 */
import React from 'react';

import MainPage from '../MainPage'
import StoryPage from '../ui/story/StoryPage'
import PicPage from '../ui/pic/PicPage'
import PicDetailPage from "../ui/pic/PicDetailPage"
import StoryDetailPage from "../ui/story/StoryDetailPage"
import TestPage from "../ui/study/TestPage";

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