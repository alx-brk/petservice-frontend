export default class User {
    id;
    email;
    name;
    password;
    role;
    avatar;
    rating;
    phone;
    city;
    activePetsitter;
    animals;
    catalogSet;
    description;
    token;


    constructor(id, email, name, password, role, avatar, rating, phone, city, activePetsitter, animals, catalogSet, description, token) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.avatar = avatar;
        this.rating = rating;
        this.phone = phone;
        this.city = city;
        this.activePetsitter = activePetsitter;
        this.animals = animals;
        this.catalogSet = catalogSet;
        this.description = description;
        this.token = token;
    }
}