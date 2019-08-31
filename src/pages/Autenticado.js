import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class Autenticado extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
    }

    tirarFoto = () => {

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
            });
        });

    }

    renderImage(image) {
        return <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={image} />
    }


    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.boxAviso}>
                        <Text style={styles.signupTitle}>Olá, {this.props.email}</Text>
                        <Text style={styles.signupDescri}>Login Realizado com sucesso!.</Text>
                    </View>
                    <View style={styles.signupTextCont}>
                        {this.state.image ? this.renderImage(this.state.image) : null}

                        <Button
                            onPress={this.tirarFoto}
                            title="Tirar Foto"
                            color="#841584"
                        />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxAviso: {
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
    signupTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
    },
    signupDescri: {
        color: '#ccc',
        lineHeight: 20
    },
    buttonText: {
        color: '#006699',
        fontWeight: 'bold',
        fontSize: 36,
    }
});