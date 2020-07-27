export default class FilterOptions {
    city;
    animals;
    petServices;
    startDate;
    endDate;
    creationDate;
    jobStatus;
    rating;

    constructor(city, animals, petServices, startDate, endDate, creationDate, jobStatus, rating) {
        this.city = city;
        this.animals = animals;
        this.petServices = petServices;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creationDate = creationDate;
        this.jobStatus = jobStatus;
        this.rating = rating;
    }
}