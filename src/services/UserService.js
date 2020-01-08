import {BehaviorSubject} from 'rxjs';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const baseUrl = 'http://localhost:8090/user'

class UserService {
    get currentUserValue(){
        return currentUserSubject.value;
    }
    get currentUser(){
        return currentUserSubject.asObservable();
    }

    login(user){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
            }
        }).get('/login')
    }

    logout(){
        // eslint-disable-next-line no-console
        console.log("logout")
        axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).post('/logout', {})
            .then((response) => {
                // eslint-disable-next-line no-console
                console.log('response on logout');
                // eslint-disable-next-line no-console
                console.log(response.data);

                localStorage.removeItem('currentUser');
                currentUserSubject.next(null);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }

    registration(user){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).post('', JSON.stringify(user));
    }

    nextUserSubject(user){
        currentUserSubject.next(user)
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

    updateProfile(user){
        return axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).put('', JSON.stringify(user));
    }
}

export default new UserService();
