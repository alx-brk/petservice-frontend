import axios from 'axios';
import UserService from "./UserService";

const baseUrl = 'http://localhost:8090/job'

class JobService {

    constructor() {
        UserService.currentUser.subscribe(data => {
            this.headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': 'Bearer ' + (data ? data.token:'')
            }
        })
    }

    fetchClientOrders(id){
        const config = {
            params: {
                id: id
            }
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
            }
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
        }).post('/', JSON.stringify(job))
    }

    search(filterOptions){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).post('/search', JSON.stringify(filterOptions))
    }

    fetchJobStatuses(){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).get('/statuses/all')
    }

    fetchUnits(){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).get('/units/all')
    }
}

export default new JobService();
