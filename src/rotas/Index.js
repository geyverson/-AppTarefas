import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Autenticado from '../pages/Autenticado';

export default class Rotas extends Component {
    render() {
        return (
            <Router barButtonIconStyle={styles.barButtonIconStyle}
                hideNavBar={false}
                navigationBarStyle={{ backgroundColor: '#1565c0', }}
                titleStyle={{ color: 'white', }}
            >
                <Stack key="root">
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="registro" component={Registro} title="Registro" />
                    <Scene key="home" component={Autenticado} title="Home" />
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}