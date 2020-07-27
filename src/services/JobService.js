import axios from 'axios';
import UserService from "./UserService";

const baseUrl = 'http://localhost:8090/job'

class JobService {

    constructor() {
        UserService.jwtToken.subscribe(token => {
            this.headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': 'Bearer ' + token,
                'X-XSRF-TOKEN': UserService.getCsrfToken
            }
        })
    }

    fetchClientOrders(id){
        const config = {
            params: {
                id: id
            },
            withCredentials: true
        };

        return axios.create({
            baseURL: baseUrl,
            headers: this.headers
        }).get('/client-orders', config);
    }

    fetchPetsitterOrders(id){
        const config = {
            params: {
                id: id
            },
            withCredentials: true
        };

        return axios.create({
            baseURL: baseUrl,
            headers: this.headers
        }).get('/petsitter-orders', config);
    }

    createOrder(job){
        return axios.create({
            baseURL: baseUrl,
            headers: this.headers
        }).post('/', JSON.stringify(job), {withCredentials: true})
    }

    search(filterOptions){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).post('/search', JSON.stringify(filterOptions), {withCredentials: true})
    }

    fetchJobStatuses(){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).get('/statuses/all', {withCredentials: true})
    }

    fetchUnits(){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).get('/units/all', {withCredentials: true})
    }
}

export default new JobService();
