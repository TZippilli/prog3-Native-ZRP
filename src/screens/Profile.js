import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      email: auth.currentUser.email,
      user: " ",
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          this.setState({ user: doc.data().user })
        })
      })

    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(
        docs => {
          let posts = [];
          docs.forEach(doc => {
            posts.push({
              id: doc.id,
              data: doc.data()
            });
          });
          posts.sort((a, b) => b.data.createdAt - a.data.createdAt);
          this.setState({ userPosts: posts });
        }
      );
  }

  //borro el post y actualizo el estado con la nueva lista, sin el post eliminado
  handleDeletePost = (postId) => {
    db.collection('posts').doc(postId).delete()
      .then(() => {
        const updatedPosts = this.state.userPosts.filter(post => post.id !== postId);
        this.setState({
          userPosts: updatedPosts
        });
      })
      .catch(error => console.log(error));
  };


  handleLogout = () => {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.userInfo}>Usuario: {this.state.user}</Text>
          <Text style={styles.userInfo}>Email: {this.state.email}</Text>
          <Text style={styles.userInfo}>#Posteos: {this.state.userPosts.length}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={this.handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Tus Publicaciones</Text>

        <FlatList
          data={this.state.userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Text style={styles.postText}>{item.data.descripcion}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDeletePost(item.id)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
