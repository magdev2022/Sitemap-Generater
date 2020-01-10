import axios from 'axios'
const axioApi = axios.create({
    baseURL: 'https://mysitemap.herokuapp.com/api',
    withCredentials: true
});
export default axioApi