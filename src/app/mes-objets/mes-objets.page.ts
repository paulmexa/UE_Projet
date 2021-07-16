import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {Objet} from "../models/objet";

@Component({
  selector: 'app-mes-objets',
  templateUrl: './mes-objets.page.html',
  styleUrls: ['./mes-objets.page.scss'],
})
export class MesObjetsPage implements OnInit {

  listeObjet: Objet[];
  constructor() { }

  ngOnInit() {
    firebase.firestore().collection('objets').where('utilisateur', '==', firebase.auth().currentUser.email).onSnapshot(
      (docRef) => {
        this.listeObjet = [];
        const appel = this;
        docRef.forEach(function(doc) {
          const tmp = doc.data() as Objet;
          if (tmp.etat !== 'find') {
            tmp.id = doc.id;
            appel.listeObjet.push(tmp);
          }
        });
      }
    );
  }

}
