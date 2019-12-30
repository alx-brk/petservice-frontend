export default class Job {
    id;
    city;
    client;
    petsitter;
    jobStatus;
    animals;
    petServices;
    description;
    startDate;
    endDate;
    creationDate;
    
    constructor(id, city, client, petsitter, jobStatus, animals, petServices, description, startDate, endDate, creationDate) {
        this.id = id;
        this.city = city;
        this.client = client;
        this.petsitter = petsitter;
        this.jobStatus = (jobStatus) ? jobStatus : 'Новый';
        this.animals = animals;
        this.petServices = petServices;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creationDate = creationDate;
    }
}