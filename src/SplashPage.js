/**
 * Created by fupingfu on 2017/2/21.
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

export default class SplashPage extends React.Component {
    constructor() {
        this.state = {
            name: "name"
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection:"column"}}>
                <Text>This is splashPage</Text>
            </View>
        )
    }
}