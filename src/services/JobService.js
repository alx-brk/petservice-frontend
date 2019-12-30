import axios from 'axios';

const baseUrl = 'http://localhost:8090/job'

class JobService {
    fetchClientOrders(id){
        const config = {
            params: {
                id: id
            }
        };

        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).get('/client-orders', config);
    }

    createOrder(job){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
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
}

export default new JobService();