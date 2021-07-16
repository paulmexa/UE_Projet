export class Utilisateur {
    photo = '';
    date: string;
    grade = 0;

    constructor(public nom: string, public prenom: string, public email: string, public telephone: any) {
        this.date = new Date().toString();
    }
}
