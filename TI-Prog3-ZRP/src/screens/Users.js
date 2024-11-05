import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../firebase/config'; 

class UsuariosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [] 
    };
  }

  componentDidMount() {
    db.collection('users').get().then(snapshot => {
      const usuariosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.setState({ usuarios: usuariosData });
      console.log(this.state.usuarios); 
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text>{item.email}</Text>
          )}
        />
      </View>
    );
  }
}

export default UsuariosScreen;
