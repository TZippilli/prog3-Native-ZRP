import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-web';
import {db} from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    })
                })
            }
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Posts</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Post email = {item.data.email} descripcion = {item.data.descripcion}/>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f0f0f5',
      padding: 20,
  },
  title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1a1f71',
      marginBottom: 20,
      textAlign: 'center',
  },
  postContainer: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15,
      marginBottom: 15,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
  },
  postEmail: {
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
  },
  postMensaje: {
      color: '#666',
      fontSize: 16,
  },
});


