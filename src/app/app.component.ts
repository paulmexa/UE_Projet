import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {

    const firebaseConfig = {
      apiKey: "AIzaSyA7hHsl4HbqD39CKUcLdIhCDVfnKHSLGu0",
      authDomain: "lostbutfind-944ad.firebaseapp.com",
      projectId: "lostbutfind-944ad",
      storageBucket: "lostbutfind-944ad.appspot.com",
      messagingSenderId: "377601055348",
      appId: "1:377601055348:web:961095f2c7a2b9e74e0f21"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Activation de la persistance de donnée
    firebase.firestore().enablePersistence();
  }
}
