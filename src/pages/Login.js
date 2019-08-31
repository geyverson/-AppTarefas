import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Form from './Formulario'

export default class Login extends Component {

    signup() {
        Actions.registro()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Form type="Login" />
                <View style={styles.boxAviso}>
                    <Text style={styles.signupTitle}>Aplicativo de Exemplo para a Prova I do Professor Carlos Alberto</Text>
                    <Text style={styles.signupDescri}>Este Aplicativo simula o registro e login de novos usuários usando async storage com acesso a camera do dispositivo na tela Home após autenticaçäo.</Text>            
                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Você ainda não tem uma conta ? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Registro</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    boxAviso:{
        padding: 20
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: '#12799f',
        fontSize: 16,
    },
    signupButton: {
        color: '#12799f',
        fontSize: 16,
        fontWeight: '500',
    },
    signupTitle:{
        color: 'black',
        fontWeight: 'bold'
    },
    signupDescri:{
        color: '#ccc',
        lineHeight: 20
    }
});