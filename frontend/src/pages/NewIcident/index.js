import React, {useState} from 'react'
import './style.css'
import '../global.css'
import {FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'


export default function NewIncident(){
    
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(e) {
        e.preventDefault()

        const data = {
            title, description, value,
        }

        try {
          await api.post('incidents', data, {
            headers: {
                Authorization: ongId,
            }
          }) 
          
          history.push('/profile')

        } catch (err) {
            alert('Erro ao cadastrar caso.')
        }
    }

    return (
        <div className="new-incident-conteiner">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Escreva o texto detalhadamente para encontrar o herói para resolver isso!</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>           
                </section>

                <form onSubmit={handleNewIncident}>
                    <input  
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />                
                    <textarea  
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />                
                    <input  
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />                
                    <button text="submit" className="button">Enviar</button>                                    
                </form>
            </div>
        </div>
    )
}