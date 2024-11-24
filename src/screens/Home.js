import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        db.collection('posts')
            .orderBy("createdAt", "desc")
            .onSnapshot((docs) => {
                let posts = [];
                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false,
                })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Posts</Text>
                {!this.state.loading && <FlatList
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({ item }) => (
                        <Post item={item} />
                    )}
                />}

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


