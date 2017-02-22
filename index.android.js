/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';

import FirstScene from "./src/SplashPage";

export default class RNOneside extends React.Component {
    render() {
        let defaultName = "First";
        let defaultComponent = FirstScene;
        return (
            <Navigator
                initialRoute={{name:defaultName, component: defaultComponent}}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;

                    return <Component {...route.params} navigator={navigator}/>
                }}
            />
        );
    }
}

AppRegistry.registerComponent('RNOneside', () => RNOneside);
