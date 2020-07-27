export default class ClientState {

    constructor(jwtToken, profile) {
        this._profile = profile;
    }

    get profile() {
        return this._profile;
    }

    set profile(value) {
        this._profile = value;
    }
}
