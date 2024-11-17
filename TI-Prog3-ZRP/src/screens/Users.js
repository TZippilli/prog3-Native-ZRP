import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            filterUser: [],
            filterValue: '',
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    usuarios: users,
                    filterUser: users
                });
            }
        );
    }
//elegimos filtrar por email
    userFilter = (text) => {
        this.setState({
            filterValue: text,
            filterUser: this.state.usuarios.filter(users =>
                users.data.email.toLowerCase().includes(text.toLowerCase())
            ),
        });
    };

    render() {
      return (
          <View style={styles.container}>
              <View style={styles.formContainer}>
                  <Text style={styles.title}>Users</Text>
                  <Text style={styles.subtitle}>Search users</Text>

                  <TextInput
                      style={styles.input}
                      keyboardType='email-address'
                      placeholder='Filtrar email'
                      onChangeText={this.userFilter}
                      value={this.state.filterValue}
                  />
              </View>

             
              {this.state.filterUser.length === 0 ? (
                  <Text style={styles.noResults}>El email no existe</Text>
              ) : (
                  <FlatList
                      data={this.state.filterUser}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                          <View style={styles.userItem}>
                              <View style={styles.userInfo}>
                                  <Text style={styles.userEmail}>Email: {item.data.email}</Text>
                                  <Text style={styles.userUsername}>Username: {item.data.user}</Text>
                              </View>
                          </View>
                      )}
                      contentContainerStyle={styles.listContent}
                  />
              )}
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
  formContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userEmail: {
    fontSize: 14,
    color: '#333',
  },
  userUsername: {
    fontSize: 14,
    color: '#777',
  },
});
