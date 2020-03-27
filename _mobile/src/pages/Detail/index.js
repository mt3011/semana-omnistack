import React from 'react'
import {Feather} from '@expo/vector-icons'
import {View, TouchableOpacity, Image, Text, Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import styles from './style'
import logoImg from '../../assets/logo.png'

export default function Detail() {

    const navigation = useNavigation()

    const ongName ='APAD'
    const incidentName = 'Cadelinha Atropelada'
    const incidentValue = String(120)
    const incidentMail = 'alexandratavares.turismo@hotmail.com'

    const message = `Olá, ${ongName}, estou entrando em contato pois gostaria de ajudar no caso ${incidentName} com o valor de R$ ${incidentValue},00`

    function navigateToIncidents() {
        navigation.goBack()
    }
    
    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incidentName}`,
            recipients: [incidentMail],
            body: message,
        })
    }

    function sendWhats(params) {
        Linking.openURL(`whatsapp://send?phone=5585987237227&text=${message}`)
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateToIncidents}>
                    <Feather name="arrow-left" size={24} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={[styles.incident, {marginTop: 20}]}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>APAD</Text>
            
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>Cadelinha atropelada:</Text>
            
                <Text style={styles.incidentProperty}>VALOR</Text>
                <Text style={styles.incidentValue}>R$ 120,00</Text>
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