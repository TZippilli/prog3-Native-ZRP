import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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

  onSubmit(email, password, bio, user) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        if (response) {
          db.collection('users').add({
            bio: bio,
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
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='Email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Usuario'
          onChangeText={text => this.setState({ user: text })}
          value={this.state.user}
        />
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <TextInput
          style={styles.input}
          keyboardType='bio'
          placeholder='Bio'
          onChangeText={text => this.setState({ bio: text })}
          value={this.state.bio}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.user, this.state.bio)}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {this.state.errorMsg ? <Text style={styles.error}>{this.state.errorMsg}</Text> : null}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: '#ff4d4d',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

