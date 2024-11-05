import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    };
  }

  onSubmit = () => {
    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('HomeMenu');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          this.setState({ errorMsg: 'El correo electrónico no es válido.' });
        } else if (error.code === 'auth/wrong-password') {
          this.setState({ errorMsg: 'La contraseña es incorrecta.' });
        } else if (error.code === 'auth/user-not-found') {
          this.setState({ errorMsg: 'No se encontró una cuenta con ese correo.' });
        } else {
          this.setState({ errorMsg: 'Hubo un error al iniciar sesión, por favor intente de nuevo.' });
        }
      });
  };
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingresar</Text>

        <TextInput 
          style={styles.input} 
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput 
          style={styles.input} 
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.buttonGreen} onPress={this.onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {this.state.errorMsg ? <Text style={styles.error}>{this.state.errorMsg}</Text> : null}

        <TouchableOpacity
          style={styles.buttonBlue}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>No tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  buttonGreen: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
    width: '100%',
    marginTop: 20,
  },
  buttonBlue: {
    backgroundColor: '#67b7f7',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonOrange: {
    backgroundColor: '#f7a667',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    marginTop: 30,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    width: '100%',
    alignItems: 'center',
  },
});
