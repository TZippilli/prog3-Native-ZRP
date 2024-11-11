import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            descripcion: ''
        };
    }

    handleSubmit(descripcion) {
        console.log(descripcion)
        db.collection('posts').add({
            descripcion: descripcion,
            email: auth.currentUser.email,
            createdAt: Date.now()
          })
          .then(() => {
            this.setState({ registered: true, errorMsg: '' });
            console.log("creado")
          })
          .catch(e => console.log(e.message));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>

                    <Text style={styles.title}> Post! </Text>

                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Mensaje del post...'
                        onChangeText={text => this.setState({ descripcion: text })}
                        value={this.state.descripcion}
                        multiline={true}
                        numberofLines={4} />

                    <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit( this.state.descripcion)}>
                        <Text style={styles.buttonText}> Crear post </Text>
                    </TouchableOpacity>
                </View>

                {this.state.errorMsg && <Text>{this.state.errorMsg}</Text>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1f71',
    },
    container: {
        width: '90%',
        backgroundColor: '#f0f0f5',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    image: {
        height: 120,
        width: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1f71',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 45,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4e54c8',
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorMsg: {
        color: '#ff1744',
        marginTop: 10,
    },
});
