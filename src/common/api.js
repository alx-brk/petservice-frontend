import axios from 'axios';

export const host = "http://localhost:8090";
export const userController = axios.create({
    baseURL: host + "/user",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    }
});
export const jobController = axios.create({
    baseURL: host + "/job",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    }
});
export const animalController = axios.create({
    baseURL: host + "/animal",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    }
});
export const serviceController = axios.create({
    baseURL: host + "/pet-service",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    }
});
export const cityController = axios.create({
    baseURL: host + "/city",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    }
});
export const imageController = axios.create({
    baseURL: host + "/image",
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': true,
        'Content-Type': 'multipart/form-data; boundary=--jopaOlolo'
    }
});