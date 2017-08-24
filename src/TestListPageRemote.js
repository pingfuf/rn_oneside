/**
 * Created by fupingfu on 2017/4/27.
 */
import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import BaseComponent from './base/BaseComponent';
import RefreshInfiniteListView from '@remobile/react-native-refresh-infinite-listview';

export default class TestListPage extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      data: {
        id:0,
        link: "",
        title:""
      }
    };
    //
    this.data = {
      index: 0,
      list:[],
      hasMore:true,
      pageSize: 10
    };
    this.getData = this.getData.bind(this);
}

  componentDidMount() {
    let page = this.data.index;
    this.getData(true, -1);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ceshi测试</Text>
        <Text>测试</Text>
        <View style={{height: 500, width: this.system.screenWidth, backgroundColor:"#54aabb"}}>
          {/*{this.renderListView()}*/}
          {this.renderPullToRefreshListView()}
        </View>
      </View>
    )
  }

  renderPullToRefreshListView() {
    if (this.state.dataSource && this.state.dataSource.getRowCount() > 0) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <RefreshInfiniteListView
            ref = {(list) => {this.list= list}}
            dataSource={this.state.dataSource}
            renderRow={(item)=>
              <View key={item.id} style={{height: 40, width:200, backgroundColor:"#3224ab"}}>
                 <Text>{item.title}</Text>
              </View>
            }
            renderSeparator={()=>this.renderSeparator()}
            loadedAllData={()=>this.hasLoadAllData()}
            initialListSize={30}
            scrollEventThrottle={10}
            style={{backgroundColor:'transparent'}}
            onRefresh={()=>this.onRefresh()}
            onInfinite={()=>this.onLoadMore()}
          />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>加载中</Text>
        </View>
      );
    }

  }

  renderListView() {
    if (this.state.dataSource && this.state.dataSource.getRowCount() > 0) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item)=>this.renderRow(item)}
        />
      );
    } else {
      return (<Text>加载中</Text>);
    }
  }

  getData(init, type) {
    if (init) {
      this.data.index = 0;
      this.data.list = [];
    }

    let page = this.data.index;
    super.startRequest("http://route.showapi.com/958-1", {page: page, type: "/category/weimanhua/kbmh"}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let listObj = data.showapi_res_body.pagebean;
        this.data.hasMore = listObj.hasMorePage;
        alert("hasmore = " + listObj.hasMorePage);
        this.data.list = listObj.contentlist;
        alert("list = " + listObj.contentlist.length);

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(listObj.contentlist)
        });
      }

      if (type == 0) {
        this.list.hideHeader();
      } else if (type == 1) {
        this.list.hideFooter();
      }
    });
    this.data.index ++;
  }

  onRefresh() {
    this.getData(true, 0);
  }

  onLoadMore() {
    this.getData(false, 1);
  }

  hasLoadAllData() {
    return this.data.hasMore;
  }

  renderRow(item) {
    return (
      <View key={item.id} style={{height: 40, width:200, backgroundColor:"#3224ab"}}>
        <Text>{item.title}</Text>
      </View>
    );
  }

  renderSeparator() {
    return(
      <View style={{height:1, width:this.system.screenWidth, backgroundColor:"#454545"}} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb00FF',
  },

  row: {
    height:60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  list: {
    alignSelf:'stretch'
  },

  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
});