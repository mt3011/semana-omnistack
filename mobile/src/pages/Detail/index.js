import React from 'react'
import {Feather} from '@expo/vector-icons'
import {View, TouchableOpacity, Image, Text, Linking} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import styles from './style'
import logoImg from '../../assets/logo.png'

export default function Detail() {

    const navigation = useNavigation() 

    const route = useRoute()

    const incident = route.params.incident
    const message = `Olá, ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de R$ ${incident.value},00`

    function navigateToIncidents() {
        navigation.goBack()
    }
    
    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhats() {
        Linking.openURL(`whatsapp://send?phone=${incident.number}&text=${message}`)
        console.log(incident.number);
        
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateToIncidents}>
                    <Feather name="arrow-left" size={24} color="#E82041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>Valor</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, styles.heroTitle]}>Salve o dia!</Text>
                <Text style={[styles.incidentValue, styles.heroTitle]}>Seja o herói desse caso.</Text>
            
                <Text style={styles.incidentProperty}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhats}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail} >
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>            
                
            </View>
        </View>
    )
}