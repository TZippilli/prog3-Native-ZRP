import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet } from 'react-native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Users from '../screens/Users';
import { Ionicons } from '@expo/vector-icons';
import NewPost from '../screens/NewPost';
import { auth } from '../firebase/config';

const Tab = createBottomTabNavigator();

export default class HomeMenu extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/pandagramLogo.png')}
          style={styles.logo}
        />
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Nuevo post"
            component={NewPost}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="create" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Users"
            component={Users}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
  }
});
