/**
 * Created by fupingfu on 2017/5/8.
 */
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import BaseComponent from './BaseComponent'

export default class PicDetailPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      url:""
    };
  }

  componentDidMount () {
    super.startRequest("http://route.showapi.com/978-1", {id: this.props}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let listObj = data.showapi_res_body.pagebean;
        if (listObj != null) {
          let newList = data.showapi_res_body.pagebean.contentlist;
          this.setState({
            dataList: newList,
            dataSource: this.state.dataSource.cloneWithRows(newList),
            page: page
          });
        }
      }
      this._pullToRefreshListView.endRefresh()
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Image></Image>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb00FF',
  }
});