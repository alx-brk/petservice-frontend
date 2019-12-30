export default class Catalog {
    petsitter;
    petService;
    price;
    units;

    constructor(petsitter, petService, price, units) {
        this.petsitter = petsitter;
        this.petService = petService;
        this.price = price;
        this.units = units;
    }
}