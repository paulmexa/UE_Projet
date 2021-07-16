export class Notification {
    date = '';

    constructor(public utilisateur: string, public termes: string, public etat: number) {
        this.date = new Date().toString();
    }
}
