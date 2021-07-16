import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {Objet} from "../../../models/objet";
import {ModalController, NavParams} from "@ionic/angular";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-apercu-objet',
  templateUrl: './apercu-objet.page.html',
  styleUrls: ['./apercu-objet.page.scss'],
})
export class ApercuObjetPage implements OnInit {

  isLoading = false;
  objet: Objet = null;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private alertService: AlertService, private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    firebase.firestore().collection('objets').doc(this.navParams.get('id')).onSnapshot(
      (docRef) => {
        this.objet = docRef.data() as Objet;
      }
    );
  }

  declareObjet() {
    firebase.firestore().collection('objets').doc(this.objet.id).update(
      {
        etat: this.objet.etat === 'lost' ? 'present' : 'lost',
      }
    ).then(
      () => {
        this.isLoading = false;
        this.alertService.print('Mis à jour effectuée', 'dark');
      },
      () => {
        this.isLoading = false;
        this.alertService.print('Une erreur est survenue lors de l\'opération, veillez reesayer', 'danger');
      }
    );
  }

  deleteObjet() {
    firebase.firestore().collection('objets').doc(this.objet.id).delete().then(
      () => {
        this.dismissModal();
        this.alertService.print('Objet supprimé', 'dark');
      },
      () => {
        this.isLoading = false;
        this.alertService.print('Une erreur est survenue lors de l\'opération, veillez reesayer', 'danger');
      }
    );
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
