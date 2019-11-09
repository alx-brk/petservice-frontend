export default class Animal {
    constructor (rawData = {}) {
        this.id = rawData.id;
        this.name = rawData.name;
    }
}