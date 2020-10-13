import axios from "axios"

const instance = axios.create({
    baseURL : "https://burger-app-react-c2d0f.firebaseio.com"
})

export default instance