import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: '',
    };
  }

  handleSubmit = () => {
    const { descripcion } = this.state;

    db.collection('posts').add({
      descripcion: descripcion,
      email: auth.currentUser.email,
      likes: [],
      createdAt: Date.now()
    })
      .then(() => {
        this.setState({ descripcion: '' });
      })
      .catch(e => console.log(e.message));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Post!</Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
            placeholder='Mensaje del post...'
            onChangeText={text => this.setState({ descripcion: text })}
            value={this.state.descripcion}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit}
            disabled={!this.state.descripcion.trim()}
          >
            <Text style={styles.buttonText}>Crear post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});