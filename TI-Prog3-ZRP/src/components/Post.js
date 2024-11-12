import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantidad: this.props.item.data.likes.length
    };
  }

  componentDidMount(){
    if(this.props.item.data.likes.includes(auth.currentUser.email)){
      this.setState({
        like: true
      })
    }
  }

  handleLike = () => {
    db.collection('posts').doc(this.props.item.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(this.props.item.data.email)
    })
    .then(() => {
      this.setState({
        like: true,
        cantidad: this.props.item.data.likes.length
      });
    });
  }

  handleDislike = () => {
    db.collection('posts').doc(this.props.item.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(() => {
      this.setState({
        like: false,
        cantidad: this.props.item.data.likes.length
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.item.data.descripcion}</Text>
        <Text>Publicado por: {this.props.item.data.email}</Text>
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={this.state.like ? this.handleDislike : this.handleLike}>
            <Ionicons //agrego icono de corazon 
              name={this.state.like ? 'heart' : 'heart-outline'}
              size={24}
              color={this.state.like ? 'red' : 'gray'}
            />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{this.state.cantidad}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likeCount: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
});