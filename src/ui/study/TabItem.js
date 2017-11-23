/**
 * Created by fupingfu on 2017/2/10.
 */
import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text
} from 'react-native';

export default class TabItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let imgUri = this.props.img;
        var data;
        return(
            <View style={{flex: 1, flexDirection:'column', justifyContent:'center'}}>
                <Image style={{height: 30, width: 30}} source={this.props.img}></Image>
                <Text style={{height: 20}}>lalalal</Text>
            </View>
        );
    }
}