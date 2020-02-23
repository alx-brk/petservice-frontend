import axios from 'axios';

const baseUrl = 'http://localhost:8090/pet-service'

class PetServiceService {
    fetchAll(){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).get('/all', {withCredentials: true})
    }
}

export default new PetServiceService();
