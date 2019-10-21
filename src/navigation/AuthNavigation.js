import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';

const AuthNavigation = createStackNavigator(
  {
    Login: {screen: Login},
    Signup: {screen: Signup},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

export default AuthNavigation;
