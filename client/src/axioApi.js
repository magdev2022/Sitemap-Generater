import axios from 'axios'
const axioApi = axios.create({
    baseURL: 'http://localhost:5000/api'
});
export default axioApi