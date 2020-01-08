import axios from 'axios'

const axioApi = axios.create({
    baseURL: 'https://sitemap-hero.herokuapp.com/api'
});
export default axioApi