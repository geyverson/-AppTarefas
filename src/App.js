import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  YellowBox
} from 'react-native';

import Rotas from '../src/rotas/Index';

YellowBox.ignoreWarnings(['Warning:']);

export default class App extends Component   {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#002f6c" 
          barStyle="light-content"
        />
        <Rotas/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});