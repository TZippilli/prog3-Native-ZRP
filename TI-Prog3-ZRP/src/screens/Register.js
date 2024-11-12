import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      bio: '',
      user: '',
      registered: false,
      errorMsg: ''
    };
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if (user){
        this.props.navigation.navigate("HomeMenu")
      }
    })
  }


  onSubmit(email, password, bio, user) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        if (response) {
          db.collection('users').add({
            email: email,
            user: user,
            createdAt: Date.now()
          })
          .then(() => {
            this.setState({ registered: true, errorMsg: '' });
            this.props.navigation.navigate('Login');
          })
          .catch(e => console.log(e.message));
        }
      })
      .catch(error => this.setState({ errorMsg: error.message }));
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../../assets/pandagramLogo.png')}
            resizeMode="contain"
          />
          <Text style={styles.title}>Crear cuenta</Text>

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
            keyboardType="default"
            placeholder="Usuario"
            placeholderTextColor="#aaa"
            onChangeText={text => this.setState({ user: text })}
            value={this.state.user}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.bio, this.state.user)}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          {this.state.errorMsg ? <Text style={styles.error}>{this.state.errorMsg}</Text> : null}
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
    height: 100,
    width: 100,
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
  bioInput: {
    height: 80,
    paddingVertical: 10,
    textAlignVertical: 'top', 
  },
  buttonPrimary: {
    backgroundColor: '#4e54c8', 
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
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
