import {BehaviorSubject} from 'rxjs';
import * as api from '../common/api';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class UserService {
    get currentUserValue(){
        return currentUserSubject.value;
    }
    get currentUser(){
        return currentUserSubject.asObservable();
    }

    login(user){
        return axios.create({
            baseURL: 'http://localhost:8090',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'Authorization': 'Basic ' + btoa(user.email + ':' + user.password)
            }
        }).get('/user/login')
    }

    logout(){
        // eslint-disable-next-line no-console
        console.log("logout")
        axios.create({
            baseURL: 'http://localhost:8090',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).post('/user/logout', {})
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
        return api.userController.post('', JSON.stringify(user));
    }

    nextUserSubject(user){
        currentUserSubject.next(user)
    }
}

export default new UserService();