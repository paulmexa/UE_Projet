import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Utilisateur } from '../models/utilisateur';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: Utilisateur = null;
  
  constructor() { }

  ngOnInit() {
    firebase.firestore().collection('comptes').doc(firebase.auth().currentUser.email).onSnapshot(
      (docRef: any) => {
        this.user = docRef.data() as Utilisateur;
      }
    );
  }

}
