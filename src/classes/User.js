export default class User {
    constructor (rawData = {}) {
        this.id = rawData.id;
        this.avatar = "https://randomuser.me/api/portraits/women/81.jpg";
        this.email = rawData.email;
        this.phone = rawData.phone;
        this.city = rawData.city;
        this.activePetsitter = rawData.activePetsitter;
        this.catalog = rawData.catalog;
        this.animals = rawData.animals;
        this.description = rawData.description;
        this.rating = rawData.rating;
        this.feedback = rawData.feedback;
    }
}