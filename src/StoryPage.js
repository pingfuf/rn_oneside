/**
 * Created by fupingfu on 2017/2/23.
 */
import React from 'react';
import {
  Image,
  InteractionManager,
  ListView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ProgressBarAndroid,
  ActivityIndicatorIOS,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
import DropDownMenu from 'react-native-dropdown-menu';
import BaseComponent from './BaseComponent';
import StoryDetailPage from './StoryDetailPage';

export default class StoryPage extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dataList:[],
      page: 1
    };
    this.data = {
      menu: [["鬼故事", "笑话"], ["短篇", "长篇", "校园", "医院", "家里", "民间", "灵异", "原创", "内涵"]],
      storyTypes:["dp", "cp", "xy", "yy", "jl", "mj", "ly", "yc", "neihanguigushi"],
      section:0,
      row: 0,
      dataList:[]
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(()=>{
      this._pullToRefreshListView.beginRefresh();
    })
  }

  render() {
    return (
      <View style={{flex:1}}>

        <DropDownMenu
          style={{flex: 1}}
          //set the arrow icon, default is a triangle
          arrowImg={require('./images/ic_business_down.png')}

          //set the icon of the selected item, default is a check mark
          //checkImage={require('./images/ic_business_up.png')}
          bgColor={"red"}
          tintColor={"white"}
          selectItemColor={"red"}
          data={this.data.menu}
          maxHeight={this.system.screenHeight * 0.5}
          handler={(selection, row) => this.freshListView(selection, row)}>

          {this.renderListView()}

        </DropDownMenu>
      </View>
    );
  }

  renderListView() {
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
    );
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

  _renderRow (rowData, sectionID, rowID){
    return (
      <View style={styles.content}>
        <Image source={{uri:rowData.img}} style={[styles.img, {borderRadius: 25}]} />

        <TouchableOpacity style={styles.item} onPress={()=>this.gotoStoryDetailPage(rowData)}>
          <View style={{marginRight: 15}}>
            <Text numberOfLines={1} style={styles.title}>
              {rowData.title}
            </Text>
            <Text numberOfLines={2} style={[styles.desc,{width: this.system.screenWidth - 75}]}>{rowData.desc}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * 跳转到故事详情页面
   *
   * @param rowData
   * @private
   */
  gotoStoryDetailPage(rowData) {
    const {navigator} = this.props;
    if (navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面
      navigator.push({
        name: "storyDetail",
        component: StoryDetailPage,
        params: {
          id: rowData.id,
          title: rowData.title
        }
      })
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
    let type = this.data.storyTypes[this.data.row];
    super.startRequest("http://route.showapi.com/955-1", {"page": page, "type": type}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let listObj = data.showapi_res_body.pagebean;
        if (listObj != null) {
          let newList = listObj.contentlist;
          this.setState({
            dataList: newList,
            page: page,
            dataSource: this.state.dataSource.cloneWithRows(newList)
          });
        }
      }
      this._pullToRefreshListView.endRefresh();
    });
  }

  _onLoadMore() {
    //console.log('outside _onLoadMore start...')

    let page = this.state.page + 1;
    super.startRequest("http://route.showapi.com/955-1", {"page": page, "type": "dp"}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let listObj = data.showapi_res_body.pagebean;
        if (listObj != null) {
          let newList = this.state.dataList.concat(listObj.contentlist);
          this.setState({
            dataList: newList,
            page: page,
            dataSource: this.state.dataSource.cloneWithRows(newList)
          });
        }
      }
      this._pullToRefreshListView.endLoadMore();
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

  freshListView(section, row) {
    if (row != this.data.row) {
      this.data.row = row;
      this._pullToRefreshListView.beginRefresh();
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: 80,
    width: 900,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },

  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 15
  },

  img: {
    height: 50,
    width: 50,
    marginLeft: 10
  },

  title: {
    fontSize: 16,
    marginRight: 10
  },

  desc: {
    marginTop: 5,
    fontSize: 14,
    marginLeft: 5,
    marginRight: 10
  }
});