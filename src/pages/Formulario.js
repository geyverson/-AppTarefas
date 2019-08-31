import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Formulario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    saveData = async () => {

        const { email, password } = this.state;

        // salvar dados usando asyncstorage
        let loginDetalhe = {
            email: email,
            password: password
        }

        if (this.props.type !== 'Login') {
            AsyncStorage.setItem('loginDetalhe', JSON.stringify(loginDetalhe));

            Keyboard.dismiss();
            alert("Registro realizado com sucesso. Email: " + email + ' password: ' + password);
            this.gotoLogin();
        }
        else if (this.props.type == 'Login') {
            try {
                let loginDetalhe = await AsyncStorage.getItem('loginDetalhe');
                let ld = JSON.parse(loginDetalhe);

                if (ld.email != null && ld.password != null) {
                    if (ld.email == email && ld.password == password) {
                        this.gotoAutenticado(ld.email)
                    }
                    else {
                        alert('Email ou senha nao existem');
                    }
                }

            } catch (error) {
                alert('Email ou senha nao existem');
            }
        }
    }

    gotoAutenticado = (email) => {
        Actions.home({email: email})
    }

    gotoLogin = () => {
        Actions.login()
    }

    showData = async () => {
        let loginDetalhe = await AsyncStorage.getItem('loginDetalhe');
        let ld = JSON.parse(loginDetalhe);
        alert('email: ' + ld.email + ' ' + 'password: ' + ld.password);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    onChangeText={(email) => this.setState({ email })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()} />

                <TextInput style={styles.inputBox}
                    onChangeText={(password) => this.setState({ password })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Senha"
                    secureTextEntry={true}
                    placeholderTextColor="#002f6c"
                    ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});