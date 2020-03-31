import axios from 'axios'

const api = axios.create({
    baseURL: 'https://3333-e06d259f-9778-4d2f-843d-4310bd952bff.ws-us02.gitpod.io/',
})

export default api