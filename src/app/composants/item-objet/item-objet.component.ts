import {Component, Input, OnInit} from '@angular/core';
import {ApercuObjetPage} from "./apercu-objet/apercu-objet.page";
import {ModalController} from "@ionic/angular";
import firebase from "firebase";
import {Objet} from "../../models/objet";

@Component({
  selector: 'app-item-objet',
  templateUrl: './item-objet.component.html',
  styleUrls: ['./item-objet.component.scss'],
})
export class ItemObjetComponent implements OnInit {

  @Input() idObjet: string;
  @Input() skin: string;

  constructor(private modalController: ModalController) { }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  objet: Objet = null;

  ngOnInit() {
    firebase.firestore().collection('objets').doc(this.idObjet).onSnapshot(
      (docRef) => {
        this.objet = docRef.data() as Objet;
      }
    );
  }

  async openPageApercu() {
    const modal = await this.modalController.create({
      component: ApercuObjetPage,
      componentProps: {
        id: this.idObjet
      }
    });
    return await modal.present();
  }
}
