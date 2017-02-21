/**
 * Created by fupingfu on 2017/1/23.
 */
import React from 'react';
import {
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    StyleSheet,
    View
} from 'react-native';

import SecondScene from "./SecondScene";
import TabItem from "./TabItem";

export default class FirstScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressButton() {
        let defaultComponent = SecondScene;
        const {navigator} = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                name: 'SecondScene',
                component: SecondScene
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text>lslsdfsls</Text>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <Text>点我跳转k</Text>
                        <Text style={styles.welcome}>welcome</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity style={{height:50, flex:0.33, backgroundColor:'#fafafa'}}>
                        <TabItem style={{height:50, width: 50}} index="1" img='./images/func_buy.png'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:50, flex:0.33, backgroundColor:'#324534'}}>

                    </TouchableOpacity>
                    <TouchableOpacity style={{height:50, flex:0.33, backgroundColor:'#aabbcc'}}>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33FCFF',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    bottom: {
        flexDirection:'row',
        justifyContent:'center',
        height:50
    }
});