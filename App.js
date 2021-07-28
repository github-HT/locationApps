import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './src/pages/home/HomeScreen';
import {DiscoveryScreen} from './src/pages/discovery/DiscoveryScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Initializer} from 'react-native-baidumap-sdk';
// Initializer.init('6s1BDd7jUHhzUV8S8E3kMEyAKfqkKPrw');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <ProfileScreen />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Welcome',
              headerShown: false,
              headerStatusBarHeight: 0,
            }}
          />
          <Stack.Screen name="DiscoveryScreen" component={DiscoveryScreen} />
        </Stack.Navigator>
        {/* <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Discovery" component={DiscoveryScreen} />
        </Tab.Navigator> */}
      </NavigationContainer>
    );
  }
}

export default App;
