/**
 * Created by fupingfu on 2017/1/23.
 */
import React, { Component, PropTypes } from 'react';
import {
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import FirstScene from './SplashPage'

export default class MyScene extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        onForward: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    }

    _onPressed() {
        let defaultName = "MyScene";
        let component = FirstScene;
        if(navigator) {
            alert("navigator");
            navigator.push({
                name:defaultName,
                component:component,
                params:{
                    id:10,
                    name:"lalal"
                }
            })
        } else {
            this.props.onForward;
        }

    }
    render() {
        return (
            <View>
                <Text>Current Scene: { this.props.title }</Text>
                <TouchableHighlight onPress={this._onPressed}>
                    <Text>点我进入下一场景</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onBack}>
                    <Text>点我返回上一场景</Text>
                </TouchableHighlight>
            </View>
        )
    }
}