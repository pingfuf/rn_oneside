/**
 * Created by fupingfu on 2017/5/8.
 */
import React from 'react';
import {
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BaseComponent from '../../base/BaseComponent'

export default class PicDetailPage extends BaseComponent {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      title: "",
      state:0,
      url:"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
      width: 0,
      height: 0,
      dataSource: ds
    };
  }

  componentDidMount () {
    this.setState({
      state:0
    });

    var url = "http://route.showapi.com/978-1";
    if (this.props.type == 0) {
      url = "http://route.showapi.com/958-2";
    }

    super.startRequest(url, {id: this.props.id}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        if (this.props.type == 0) {
          if (data.showapi_res_body.item == null) {
            return;
          }
          let title = data.showapi_res_body.item.title;
          let imgList = data.showapi_res_body.item.imgList;
          let imageWidth = this.system.screenWidth - 20;
          if (imgList != null && imgList.length > 0) {
            let url = imgList[0];
            Image.getSize(url, (width, height) => {
              let imageHeight = imageWidth / width * height;
              this.setState({
                title: title,
                state: 1,
                width: imageWidth,
                height: imageHeight,
                dataSource: this.state.dataSource.cloneWithRows(imgList)
              })
            })
          }
        } else {
          let url = data.showapi_res_body.img;
          Image.getSize(url, (width, height) => {
            let imageWidth = this.system.screenWidth - 20;
            let imageHeight = imageWidth / width * height;
            this.setState({
              url: url,
              width: imageWidth,
              height: imageHeight
            })
          });
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {super.createTitleView(this.props.title)}
        {this.renderLoadingView()}
        {this.renderContentView()}
      </View>
    );
  }

  renderLoadingView() {
    if (this.state.state == 0) {
      return (
        <View style={styles.scroll}>
          <Text>加载中……</Text>
        </View>
      )
    }
  }

  renderContentView() {
    if (this.props.type == 0) {
      return this.renderListImageView();
    } else {
      return this.renderImageView();
    }
  }


  renderImageView() {
    return (
      <ScrollView contentContainerStyle={styles.scroll} horizontal={false}>
        <Image
          style={{
              flex: 1,
              marginLeft:10,
              marginTop:10,
              marginRight:10,
              marginBottom:10,
              width: this.state.width,
              height:this.state.height,
              resizeMode: Image.resizeMode.cover
            }}
          source={{uri: this.state.url}}
          onLoadEnd={()=>{
              this.setState({
                state: 1
              })
            }}/>
      </ScrollView>
    )
  }

  renderListImageView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=>
              <Image
                style={{
                  margin:10,
                  height: this.state.height,
                  width: this.state.width
                }}
                source={{uri: rowData}}
                />
        }
      />

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  scroll: {
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
});