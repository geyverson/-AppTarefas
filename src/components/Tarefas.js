import React, { Component } from 'react';
import {
    AppRegistry, FlatList,
    StyleSheet, Text, View, Image, Alert, Platform,
    TouchableHighlight, TouchableOpacity,
    RefreshControl, TextInput
} from 'react-native';
import { firebaseDatabase } from '../../servicos/config'
import { erroCodigo } from '../../servicos/utils'
import Toast from '../components/cpnToast'

// Componente funcional stateless (sem estado)
const TarefaItem = (props) => {
    return (
        <View style={[props.item.status === true ? styles.statusOk : null, styles.rowItem]}>
            <TouchableOpacity style={{ padding: 7 }} onPress={() => props.setStatus(props.item)}>
                <Text autoCapitalize={true} style={[props.item.status === true ? { fontSize: 15, color: '#FFF' } : { fontSize: 15, color: '#006699' }]}>{props.item.nomeTarefa}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 7 }} onPress={() => props.onDelete(props.item)}>
                <Image source={require('../images/x-button.png')} />
            </TouchableOpacity>
        </View>
    );
}

export default class Tarefas extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            allTarefas: [],
            novaTarefa: '',
            loading: false,
            msg: null,
            visible: false
        })

        this.ref = firebaseDatabase.collection('Tarefas');

    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({
                    id: doc.id,
                    nomeTarefa: doc.data().descricao,
                    status: doc.data().status
                });
            });
            this.setState({
                allTarefas: todos.sort((a, b) => {
                    return (a.descricao < b.descricao);
                }),
                loading: false,
            });
        });

    }

    // Ao importar o componente Toast deve-se implementar o mostrarToast e esconderToast
    mostrarToast = () => {
        this.setState({ visible: true }, () => this.esconderToast())
    }

    esconderToast = () => {
        this.setState({
            visible: false
        })
    }

    onPressAdd = () => {

        if (this.state.novaTarefa.trim() === '') {
            alert('Digite um nome para a sua tarefa!');
            return;
        }

        this.ref.doc().set({
            descricao: this.state.novaTarefa,
            status: false
        }).then(() => {

            this.setState({ msg: 'Tarefa adicionada com sucesso!' }, () => this.mostrarToast())
            this.setState({
                novaTarefa: '',
                loading: true
            })

        }).catch(() => {
            this.setState({ msg: 'Erro ao adicionar tarefa!' }, () => this.mostrarToast())
            this.setState({
                novaTarefa: '',
                loading: true
            });
        });
    }

    onPressDel = (item) => {

        Alert.alert(
            'Exclusão de Tarefa',
            `Deseja realmente exluir esta Tarefa com id = ${item.id} ?`,
            [
                { text: 'NÃO', style: 'cancel' },
                { text: 'SIM', onPress: () => this.deleteItem(item.id) },
            ]
        )
    }

    onPressStatus = (item) => {

        const statusDesc = item.status === false ? 'concluído': 'não concluído'

        Alert.alert(
            'Status de Tarefa',
            `Deseja alterar o status desta Tarefa para ${statusDesc} ?`,
            [
                { text: 'NÃO', style: 'cancel' },
                { text: 'SIM', onPress: () => this.changeStatus(item.id,item.status) },
            ]
        )
    }

    deleteItem = (id) => {

        this.ref.doc(id).delete().then(() => {

            this.setState({ msg: 'Tarefa excluída com sucesso!' }, () => this.mostrarToast())
            this.setState({
                novaTarefa: '',
                loading: true
            })

        }).catch(() => {
            this.setState({ msg: 'Erro ao excluir tarefa!' }, () => this.mostrarToast())
            this.setState({
                novaTarefa: '',
                loading: true
            });
        });
    }

    changeStatus = (id,status) => {

        this.ref.doc(id).update({
            status: !status
        }).then(() => {

            this.setState({ msg: 'Tarefa concluída com sucesso!' }, () => this.mostrarToast())
            this.setState({
                novaTarefa: '',
                loading: true
            })

        }).catch(() => {
            this.setState({ msg: 'Erro ao atualizar status da tarefa!' }, () => this.mostrarToast())
            this.setState({
                novaTarefa: '',
                loading: true
            })
        })
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                    marginVertical: 8
                }}
            />
        )
    }


    FlatListHeader = () => {
        return (
            <View elevation={1}
                style={{
                    height: 100,
                    width: "97%",
                    margin: 5,
                    backgroundColor: "#fff",
                    border: 2.9,
                    borderColor: "black",
                    alignSelf: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 16,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 7.49
                }}
            >
                <Text style={{ textShadowColor: 'black', textShadowOffset: { width: 1, height: 3 }, textShadowRadius: 10, fontSize: 40, fontWeight: '800', flex: 1, alignSelf: "center", paddingTop: 30, fontSize: 40 }}>Últimas Tarefas</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#006699',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                    <TextInput style={{
                        height: 40,
                        width: 200,
                        margin: 10,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 1,
                        color: 'white'
                    }}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Adicione uma nova tarefa'
                        autoCapitalize='none'
                        value={this.state.novaTarefa}
                        onChangeText={
                            (text) => {
                                this.setState({ novaTarefa: text });
                            }
                        }
                    />
                    <TouchableHighlight
                        style={{ marginRight: 10 }}
                        underlayColor='#eee'
                        onPress={this.onPressAdd}
                    >
                        <Image
                            style={{ width: 35, height: 35 }}
                            source={require('../images/icons-add.png')}
                        />
                    </TouchableHighlight>
                </View>

                {this.state.allTarefas.length ? <FlatList
                    data={this.state.allTarefas}
                    ListHeaderComponent={this.FlatListHeader}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <TarefaItem item={item} onDelete={this.onPressDel} setStatus={this.onPressStatus} />}
                /> :  <Text autoCapitalize={true} style={{ fontSize: 20, fontWeight: 'bold', color: 'red', textAlign: 'center' }}>Nenhuma tarefa encontrada até o momento</Text>}
                <Toast visible={this.state.visible} mensagem={this.state.msg} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusOk: {
        backgroundColor: 'green',
        color: 'white'
    }

})