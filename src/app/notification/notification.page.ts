import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  nombreNonLue = 0;
  notifications: Notification[] = [];

  constructor() { }

  ngOnInit() {
    firebase.firestore().collection('notifications').where('utilisateur' , '==', firebase.auth().currentUser.email).onSnapshot(
      (docRef: any) => {
        const pointe = this;
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        docRef.forEach(function(doc) {
          pointe.notifications.push(doc as Notification);
          if (doc.etat === 0)
          {pointe.nombreNonLue++;}
        });
      }
    );
  }

}
