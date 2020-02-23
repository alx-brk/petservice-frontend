export default class User {
    id;
    email;
    name;
    password;
    userRole;
    avatar;
    rating;
    phone;
    city;
    activePetsitter;
    animals;
    catalogSet;
    description;


    constructor(id, email, name, password, role, avatar, rating, phone, city, activePetsitter, animals, catalogSet, description) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.userRole = role;
        this.avatar = avatar;
        this.rating = rating;
        this.phone = phone;
        this.city = city;
        this.activePetsitter = activePetsitter;
        this.animals = animals;
        this.catalogSet = catalogSet;
        this.description = description;
    }
}
