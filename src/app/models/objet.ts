export class Objet {
    id = '';
    medias: string[];
    date: string;
    localisation: any;
  descriptionLieu: string;

    constructor(public type: string, public identifications: string, public etat: string, public utilisateur: string) {
        this.date = new Date().toString();
        this.medias = [];
        this.localisation = null;
        this.descriptionLieu = '';
    }
}
