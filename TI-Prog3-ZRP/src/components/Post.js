import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function Post({ email, descripcion }) {
    return (
        <View style={styles.container}>
            <Text>Email: {email}</Text>
            <Text>Mensaje: {descripcion}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});