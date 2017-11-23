/**
 * Created by fupingfu on 2017/7/17.
 */
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BaseComponent from '../base/BaseComponent'

export default class CourseManagerPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      state:0,
      url:"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
      width: 0,
      height: 0
    };
  }

  componentDidMount () {
    this.setState({
      state:0
    });
    super.startRequest("http://route.showapi.com/978-1", {id: this.props.id}, (data)=>{
      let code = data.showapi_res_code;
      if (code == 0) {
        let url = data.showapi_res_body.img;
        Image.getSize(url, (width, height)=> {
          let imageWidth = this.system.screenWidth - 20;
          let imageHeight = imageWidth / width * height;
          this.setState({
            url: url,
            width:imageWidth,
            height:imageHeight
          })
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {super.createTitleView(this.props.title)}
        {this.rendLoadingView()}
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
      </View>
    );
  }

  rendLoadingView() {
    if (this.state.state == 0) {
      return (
        <View style={styles.scroll}>
          <Text>加载中……</Text>
        </View>
      )
    }
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
