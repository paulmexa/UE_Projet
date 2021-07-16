import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import firebase from 'firebase';
import { Utilisateur } from '../models/utilisateur';
import { AlertService } from '../services/alert.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  user: Utilisateur = null;

  constructor(private alertService: AlertService, private navCtrl: NavController, private alertController: AlertController, private authentificationService: AuthentificationService) { }

  ngOnInit() {
    firebase.firestore().collection('comptes').doc(firebase.auth().currentUser.email).onSnapshot(
      (docRef: any) => {
        this.user = docRef.data() as Utilisateur;
      }
    );
  }

  async about() {
    const alert = await this.alertController.create({
      header: 'A Propos',
      message: '<h6> LostButFind v1.0 </h6>' +
        '<small>Une solution pour aider à la recherche et récupération des objets perdus </small> <br><br>' +
        '<small> Projet de fin d\'étude réalisé par </small> <br> <br>' +
        '<small>• SEFFI TCHANGA PEGUY </small> <br>' +
        '<small>• TEKOH PALMA ACHU </small><br>' +
        '<small>• NOUSSI NICOLAS </small><br>' +
        '<small>• ETALI ETALI MATHIAS JUNIOR </small> <br><br>' +
        '<small>Et supervisé par Dr Tapamo Hippolyte </small> <br><br>' +
        '<small>2021 • Département d\'Informatique | UY1 </small>',
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();
  }

  async confirmDeconnexion() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez vous vraiment vous deconnecté ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Oui',
          handler: () => {
            this.deconnexion();
          }
        }
      ]
    });

    await alert.present();
  }

  async deconnexion() {
    this.authentificationService.signOut().then(
        () => {
          this.navCtrl.navigateBack('home');
        },
        () => {
          this.alertService.print('Une erreur est survenue lors de la deconnexion, veuillez reesayer', 'danger');
        }
    );
  }

}
