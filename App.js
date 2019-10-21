import React from 'react';
import {UIManager} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {colors} from './src/utils/constants';
 

 
import AppNavigator from './src/navigation'
//GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={colors}>
        <AppNavigator
          ref={nav => {
            this.navigator = nav;
          }}
        />
      </ThemeProvider>
    );
  }
}



 