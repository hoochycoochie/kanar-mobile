import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import Icon from '../components/Icon';
export default class Home extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => <Icon name="home" color="green" />,
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.openDrawer()}
        title="open drawer"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
