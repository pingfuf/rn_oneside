/**
 * Created by fupingfu on 2017/1/23.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  ListView,
  Image,
  ActivityIndicator,
  ProgressBarAndroid,
  ActivityIndicatorIOS,
  TouchableOpacity,
  Platform,
} from 'react-native';
import BaseComponent from './BaseComponent'
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
import PicDetailPage from './PicDetailPage'

export default class PicPage extends BaseComponent {
  // 构造
  constructor(props) {
    super(props);

    this._dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      //sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    let dataList = [];

    this.state = {
      first: true,
      dataList: dataList,
      page: 1,
      dataSource: this._dataSource.cloneWithRows(dataList),
    };
  }

  componentDidMount () {
    this._pullToRefreshListView.beginRefresh();
  }

  //Using ListView
  render() {
    return (
      <PullToRefreshListView
        ref={ (component) => this._pullToRefreshListView = component }
        viewType={PullToRefreshListView.constants.viewType.listView}
        contentContainerStyle={{backgroundColor: 'yellow', }}
        style={{marginTop: Platform.OS == 'ios' ? 0 : 0, }}
        initialListSize={20}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        pageSize={20}
        renderRow={(rowData)=>this._renderRow(rowData, null, null)}
        renderHeader={(viewState)=>this._renderHeader(viewState)}
        renderFooter={(viewState)=>this._renderFooter(viewState)}
        //renderSeparator={(sectionID, rowID) => <View style={styles.separator} />}
        onRefresh={()=>this._onRefresh()}
        onLoadMore={()=>this._onLoadMore()}
        pullUpDistance={35}
        pullUpStayDistance={50}
        pullDownDistance={35}
        pullDownStayDistance={50}
      />
    )
  }

  _renderRow (rowData, sectionID, rowID){
    return (
      <View style={styles.thumbnail}>
        <TouchableOpacity style={styles.textContainer} onPress={()=>this.gotoDetail(rowData)}>
          <Text>{rowData.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderHeader(viewState) {
    let {pullState, pullDistancePercent} = viewState
    let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState
    pullDistancePercent = Math.round(pullDistancePercent * 100)
    switch(pullState) {
      case refresh_none:
        return (
          <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            <Text>pull down to refresh</Text>
          </View>
        )
      case refresh_idle:
        return (
          <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            <Text>pull down to refresh{pullDistancePercent}%</Text>
          </View>
        )
      case will_refresh:
        return (
          <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            <Text>release to refresh{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
          </View>
        )
      case refreshing:
        return (
          <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            {this._renderActivityIndicator()}<Text>refreshing</Text>
          </View>
        )
    }
  }

  _renderFooter (viewState) {
    let {pullState, pullDistancePercent} = viewState
    let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all, } = PullToRefreshListView.constants.viewState
    pullDistancePercent = Math.round(pullDistancePercent * 100)
    switch(pullState) {
      case load_more_none:
        return (
          <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            <Text>pull up to load more</Text>
          </View>
        )
      case load_more_idle:
        return (
          <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            <Text>pull up to load more{pullDistancePercent}%</Text>
          </View>
        )
      case will_load_more:
        return (
          <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
          </View>
        )
      case loading_more:
        return (
          <View style={{flexDirection: 'row', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            {this._renderActivityIndicator()}<Text>loading</Text>
          </View>
        )
      case loaded_all:
        return (
          <View style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink',}}>
            <Text>no more</Text>
          </View>
        )
    }
  }

  _onRefresh() {
    //console.log('outside _onRefresh start...')

    //simulate request data
    let page = 1;
    super.startRequest("http://route.showapi.com/978-2", {page: page}, (data)=>{
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

  _onLoadMore() {
    //console.log('outside _onLoadMore start...')

    let page = this.state.page + 1;
    super.startRequest("http://route.showapi.com/978-2", {page: page}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let listObj = data.showapi_res_body.pagebean;
        if (listObj != null) {
          let newList = this.state.dataList.concat(data.showapi_res_body.pagebean.contentlist);
          this.setState({
            dataList: newList,
            dataSource: this.state.dataSource.cloneWithRows(newList),
            page: page
          });

          let hasFinished = data.showapi_res_body.pagebean.allPages <= page;
          this._pullToRefreshListView.endLoadMore(hasFinished);

        } else {
          this._pullToRefreshListView.endLoadMore(true)
        }
      }
      this._pullToRefreshListView.endLoadMore()
    });
  }

  _renderActivityIndicator() {
    return ActivityIndicator ? (
        <ActivityIndicator
          style={{marginRight: 10,}}
          animating={true}
          color={'#ff0000'}
          size={'small'}/>
      ) : Platform.OS == 'android' ?
        (
          <ProgressBarAndroid
            style={{marginRight: 10,}}
            color={'#ff0000'}
            styleAttr={'Small'}/>

        ) :  (
          <ActivityIndicatorIOS
            style={{marginRight: 10,}}
            animating={true}
            color={'#ff0000'}
            size={'small'}/>
        )
  }
  gotoDetail(rowData) {
    const {navigator} = this.props;
    if (navigator) {
      navigator.push({
        name: 'TestPage',
        component: PicDetailPage,
        params:{
          id: rowData.id,
          title: rowData.title
        }
      })
    }
  }
}

const styles = StyleSheet.create({
  itemHeader: {
    height: 35,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    backgroundColor: 'blue',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 60,
    //borderBottomWidth: StyleSheet.hairlineWidth,
    //borderBottomColor: '#ccc',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    paddingTop: 20 + 44,
  },

  thumbnail: {
    padding: 6,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    overflow: 'hidden',
  },

  textContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});