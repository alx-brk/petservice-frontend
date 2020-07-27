export default class Feedback {
    id;
    petsitter;
    author;
    mark;
    text;

    constructor(id, petsitter, author, mark, text) {
        this.id = id;
        this.petsitter = petsitter;
        this.author = author;
        this.mark = mark;
        this.text = text;
    }
}