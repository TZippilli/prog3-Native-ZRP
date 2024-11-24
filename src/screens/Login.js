import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
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

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("HomeMenu")
      }
    })
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
      <View style={styles.background}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/pandagramLogo.png')}
            resizeMode="contain"
          />
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

          <TouchableOpacity style={styles.buttonPrimary} onPress={this.onSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {this.state.errorMsg ? <Text style={styles.error}>{this.state.errorMsg}</Text> : null}

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>No tengo cuenta</Text>
          </TouchableOpacity>
        </View>
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
  buttonPrimary: {
    backgroundColor: '#4e54c8',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ff1744',
    marginVertical: 10,
  },
});
