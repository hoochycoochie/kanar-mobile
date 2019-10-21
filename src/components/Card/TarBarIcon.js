import React from 'react';
import Icon from '../Icon';

import {colors} from '../../utils/constants';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={{marginBottom: -3}}
        color={this.props.focused ? colors.PINK : colors.WHITE}
      />
    );
  }
}
