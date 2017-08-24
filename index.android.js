/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    AppRegistry
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import SplashPage from "./src/SplashPage";

export default class RNOneside extends React.Component {

    render() {
        let defaultName = "First";
        let defaultComponent = SplashPage;
        return (
            <Navigator
                initialRoute={{
                    name:defaultName,
                    component: defaultComponent,
                    params:{
                        scheme: this.props.scheme,
                        p: this.props.p
                    }
                }}
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
