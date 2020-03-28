import React, {useState} from 'react'
import {FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './style.css'
import '../global.css'

import logoImg from '../../assets/logo.svg'


export default function Register(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name, email, whatsapp, city, uf
        }

        const response = await api.post('ongs', data)

        
        try {
            alert(`Seu ID de acesso: '${response.data.id}'. \nGuarde com cuidado, pois esse será o meio em que você consegurá acessar a plataforma.`)
            history.push('/')     
        } catch (err) {
            alert('Erro no cadastro.')
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já tenho cadastro
                    </Link>           
                </section>

                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>                
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>                
                    <input type="Whatsapp" placeholder="Whatsapp (Com DDI e DDD)" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>                
                    <div className="input-group">
                        <input type="text" placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input type="text" placeholder="uf" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)}/>    
                    </div>
                        {      /*      
                        <select>
                            <option value="invalid">Selecione o stado:</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espirito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                         */}

                        <button text="submit" className="button">Cadastrar</button>                                    
                </form>
            </div>
        </div>
    )
}