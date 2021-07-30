import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './src/pages/home/HomeScreen';
import Login from './src/pages/login/Login';
const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
              headerShown: false,
              headerStatusBarHeight: 0,
            }}
          />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
