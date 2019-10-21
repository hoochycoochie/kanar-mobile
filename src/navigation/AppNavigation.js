/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Animated, Easing} from 'react-native';
import {
  HomeScreen,
  CommandScreen,
  SearchScreen,
  ProfileScreen,
  SettingScreen,
  OneCompanyScreen,
} from '../screens';

import Icon from '../components/Icon';
import {colors} from '../utils/constants';
import Header from '../components/Header';
import I18n from '../../i18n/i18n';

//import {TouchableOpacity} from 'react-native-gesture-handler';

const TAB_ICON_SIZE = 20;
const DRAWER_ICON_SIZE = 15;
// transition config
let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  return {
    opacity,
    transform: [{scaleY}],
  };
};

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0],
  });
  const slideFromRight = {transform: [{translateX}]};
  return slideFromRight;
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps;
      const width = layout.initWidth;
      const {index, route} = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width),
      }[transition];
    },
  };
};

// end transition config

const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Home',
        header: <Header navigation={navigation} />,
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" color={tintColor} size={TAB_ICON_SIZE} />
        ),
      }),
    },
    Command: {
      screen: CommandScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Command',
        header: <Header navigation={navigation} />,
        tabBarIcon: ({tintColor}) => (
          <Icon name="cart-plus" color={tintColor} size={TAB_ICON_SIZE} />
        ),
      }),
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
        headerTitle: 'User',
        header: props => <Header navigation={props.navigation} />,
        tabBarIcon: ({tintColor}) => (
          <Icon name="search" color={tintColor} size={TAB_ICON_SIZE} />
        ),
      }),
    },
  },
  {
    lazy: true,
    swipeEnabled: false,
    animationEnabled: true,

    headerMode: 'none',

    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PINK,
      inactiveTintColor: colors.VIOLET,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },
  },
);

const drawerNav = createDrawerNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="home" size={DRAWER_ICON_SIZE} color={tintColor} />
        ),
        drawerLabel: I18n.t('home'),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="user" size={DRAWER_ICON_SIZE} color={tintColor} />
        ),
        drawerLabel: I18n.t('my_profile'),
      },
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="cogs" size={DRAWER_ICON_SIZE} color={tintColor} />
        ),
        drawerLabel: I18n.t('settings'),
      },
    },
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PINK,
      inactiveTintColor: colors.VIOLET,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },

    //contentComponent: props => <CustomDrawerContentComponent {...props} />,
  },
);

const Company = createStackNavigator(
  {
    Company: {
      screen: OneCompanyScreen,
    },
  },
  {
    headerMode: 'none',
  },
);
const AppMainNav = createStackNavigator(
  {
    Home: {
      screen: drawerNav,
      navigationOptions: ({navigation}) => ({
        headerLeft: <Header navigation={navigation} />,
        headerStyle: {
          backgroundColor: colors.VIOLET,
        },
      }),
      // navigationOptions: ({ navigation }) => ({
      //   header: <HeaderAvatar navigation={navigation} />
      // })
    },

    Company: {
      screen: Company,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: colors.VIOLET,
        },
      }),
    },

    // OneProduct: {
    //   screen: OneProduct,
    //   navigationOptions: ({navigation}) => ({
    //     header: <HeaderAvatar navigation={navigation} />,
    //     headerStyle: {
    //       backgroundColor: colors.VIOLET
    //     }
    //   })
    // }
  },
  {
    cardStyle: {
      backgroundColor: colors.WHITE,
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.ORANGE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
      },
    }),
    transitionConfig: TransitionConfiguration,
  },
);

export default AppMainNav;
