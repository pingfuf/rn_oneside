/**
 * Created by fupingfu on 2017/5/8.
 */
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import BaseComponent from './BaseComponent'

export default class PicDetailPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      url:"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
      width: 0,
      height: 0
    };
  }

  componentDidMount () {
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
            source={{uri: this.state.url}}/>
        </ScrollView>
      </View>
    );
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