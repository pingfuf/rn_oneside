/**
 * Created by fupingfu on 2017/2/23.
 */
import React from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import DropDownMenu from 'react-native-dropdown-menu';
import BaseComponent from './BaseComponent';
const data = {}
const page = 1;
export default class StoryPage extends BaseComponent {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          id: "",
          img: "",
          title: "name",
          desc: ""
        }
      ])
    };
  }

  componentDidMount() {
    super.startRequest("http://route.showapi.com/955-1", {"page": page, "type": "dp"}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let listObj = data.showapi_res_body.pagebean;
        if (listObj != null) {
          let listData = listObj.contentlist;
          for (let i = 0; i < listData.length; i++) {
              this.state.dataSource.cloneWithRows()
          }
        }
      }
    })
  }

  _pressButton(rowData) {
    const {navigator} = this.props;
    if (navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
      navigator.pop();
    }
  }

  render() {
    let data = [["鬼故事", "鬼故事", "笑话"],
                ["短篇", "短篇", "长篇", "校园", "医院", "家里", "民间", "灵异", "原创", "内涵"]];
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
          data={data}
          maxHeight={this.system.screenHeight * 0.5}
          handler={(selection, row) => alert(data[selection][row])}>

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData)=>
                <View style={styles.content}>
                  <Image source={rowData.img} />

                  <TouchableHighlight style={styles.item} onPress={this._pressButton(rowData)}>
                    <View style={styles.item}>
                      <Text>{rowData.title}</Text>
                      <Text>{rowData.desc}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              }
            />
          </View>

        </DropDownMenu>
      </View>
    );
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
    backgroundColor:'#aabbcc'
  },

  item: {
    flex: 1,
    flexDirection: 'column'
  }
});