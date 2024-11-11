import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Post extends Component {
  render() {
    const { email, descripcion } = this.props;

    return (
      <View style={styles.container}>
        <Text>Email: {email}</Text>
        <Text>Mensaje: {descripcion}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});