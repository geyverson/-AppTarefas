import React from 'react'
import { Alert, Platform, Image, ScrollView, View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../../servicos/config';
import Tarefas from '../components/Tarefas'
import NotificationService from '../utils/NotifService'
import appConfig from '../../app.json'

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { usuarioAtual: null, errorMessage: null, senderId: appConfig.senderID }
        this.notification = new NotificationService(this.onNotification);
    }

    componentDidMount() {
        const { currentUser } = firebaseAuth;
        this.setState({ usuarioAtual: currentUser })
    }

    onPressButton = () => {
        // Finalizando a sessão do usuário no Firebase e redirecionando o para a página de Login
        firebaseAuth.signOut().then(() => this.props.navigation.navigate('Login'))
    }

    onRegister(token) {
        Alert.alert("Registered !", JSON.stringify(token));
        console.log(token);
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }

    onNotification = (notif) => {
        Alert.alert(notif.title, notif.message);
      }
        
        //Permissions to use notifications
      handlePerm(perms) {
        Alert.alert("Permissions", JSON.stringify(perms));
      }

    render() {
        const { usuarioAtual } = this.state
        return (
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Text>
                        Olá {usuarioAtual && usuarioAtual.email}!
                    </Text>
                    <Tarefas />
                    {/* <Text>
                        Dados de Sessão do Usuário.
                    </Text>
                    <Text>
                        {JSON.stringify(firebaseAuth,null,4)}
                    </Text> */}
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            onPress={this.onPressButton}
                            title="Finalizar Sessão."
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Exemplo de notificação</Text>
                    <View style={styles.spacer}></View>
                    <View style={styles.body}>
              <Button title={"Notificação local"} onPress={() => { this.notification.localNotification() }} />
              <Button title={"Notificação agendada (30s)"} onPress={() => { this.notification.scheduleNotification() }} />
            </View>

                    <View style={styles.spacer}></View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#FFF',
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});