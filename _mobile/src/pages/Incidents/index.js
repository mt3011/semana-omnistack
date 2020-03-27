import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

import api from '../../services/api'
import styles from './style'
import logoImg from '../../assets/logo.png'

export default function Incidents() {
    const navigation = useNavigation()

    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)

    async function loadIncidents() {
        const response = await api.get('incidents')
        setIncidents(response.data)
        setTotal(response.headers['x-total-count'])
    }

    useEffect(() => {

    }, [])

    function navigateToDetail() {
        navigation.navigate('Detail')
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos e salve o dia.</Text>

                <FlatList
                style={styles.incidentList}
                data={incidents}
                showsVerticalScrollIndicator={false}
                keyExtractor={incident => String(incident.id)}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{Incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailButton} onPress={navigateToDetail}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E82041"/>
                        </TouchableOpacity>
                    </View>
                )}
                />

        </View>
    )
}