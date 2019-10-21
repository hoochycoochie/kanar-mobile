/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import styled from 'styled-components/native';
import {colors} from '../utils/constants';
import Icon from './Icon';

const V = styled.View``;
const Touch = styled.TouchableOpacity``;
const iconContainerStyle = {
  marginHorizontal: 25,
  paddingVertical: 20,
};

class Header extends Component {
  render() {
    return (
      <Touch
        style={{flexDirection: 'row', backgroundColor: colors.VIOLET}}
        onPress={async () => {
          await this.props.navigation.toggleDrawer();
        }}>
        <V style={iconContainerStyle}>
          <Icon name="bars" size={20} color={colors.PINK} />
        </V>
      </Touch>
    );
  }
}

export default Header;
