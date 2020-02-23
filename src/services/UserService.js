import {BehaviorSubject} from 'rxjs';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import ClientState from "../model/ClientState";

const jwtTokenSubject = new BehaviorSubject(localStorage.getItem('jwtToken'));
const clientState = new ClientState(JSON.parse(localStorage.getItem('profile')));
const baseUrl = 'http://localhost:8090';
const authController = baseUrl + '/auth';
const userController = baseUrl + '/user';

class UserService {

    constructor() {
        this.jwtToken.subscribe(token => {
            this.headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'X-XSRF-TOKEN': UserService.csrfTokenValue,
                'Authorization': 'Bearer ' + token
            };
        })
    }

    get jwtTokenValue() {
        return jwtTokenSubject.value;
    }

    get jwtToken() {
        return jwtTokenSubject.asObservable();
    }

    get getProfileState(){
        return clientState.profile;
    }

    set setProfileState(value){
        clientState.profile = value;
    }

    login(user) {
        const jwtRequest = {
            username: user.email,
            password: user.password
        };

        return axios.create({
            baseURL: authController,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).post('/authenticate', JSON.stringify(jwtRequest), {withCredentials: true})
            .then((response) => {
                const token = response.data ? response.data.token : '';
                localStorage.setItem('jwtToken', token);
                jwtTokenSubject.next(token);
                const csrfToken = response.config.headers[response.config.xsrfHeaderName];
                if (csrfToken) {
                    UserService.csrfToken = csrfToken
                }
            })
    }

    logout() {
        // eslint-disable-next-line no-console
        console.log("logout")
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('profile');
        jwtTokenSubject.next(null);
    }

    registration(user) {
        return axios.create({
            baseURL: userController,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            }
        }).post('', JSON.stringify(user), {withCredentials: true});
    }

    search(filterOptions) {
        return axios.create({
            baseURL: userController,
            headers: this.headers
        }).post('/search', JSON.stringify(filterOptions), {withCredentials: true})
    }

    updateProfile(user) {
        return axios.create({
            baseURL: userController,
            headers: this.headers
        }).put('', JSON.stringify(user), {withCredentials: true});
    }

    fetchProfile(id) {
        const config = {
            params: {
                id: id
            },
            withCredentials: true
        }
        return axios.create({
            baseURL: userController,
            headers: this.headers
        }).get('/', config);
    }

    fetchProfileInit() {
        let storedProfile = JSON.parse(localStorage.getItem('profile'));
        if (storedProfile) {
             this.setProfileState = storedProfile;
        } else {
            if (this.csrfTokenValue) {
                const jwtObject = jwtDecode(this.jwtTokenValue);

                if (jwtObject.id) {
                    this.fetchProfile(jwtObject.id)
                        .then((response) => {
                            this.setProfileState = response.data;

                            localStorage.setItem('profile', JSON.stringify(response.data))
                            const csrfToken = response.config.headers[response.config.xsrfHeaderName];
                            if (csrfToken) {
                                this.csrfTokenValue = csrfToken
                            }
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.log(error);
                        })
                }
            }
        }
    }
}

export default new UserService();
