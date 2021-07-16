import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ObjetService} from '../services/objet.service';
import {Objet} from '../models/objet';
import {AlertService} from '../services/alert.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import firebase from 'firebase';
import {Geolocation} from '@capacitor/geolocation';
import {ActivatedRoute} from '@angular/router';
import GeoPoint = firebase.firestore.GeoPoint;
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-save',
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss'],
})
export class SavePage implements OnInit {

  photos: SafeResourceUrl[] = [];
  isLoading = false;
  coordinates: any = null;
  typeOperation = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private sanitizer: DomSanitizer, private apiService: ApiService, private objetService: ObjetService, private alertService: AlertService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.typeOperation = params.TypeOperation;
    });

    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    this.coordinates = await Geolocation.getCurrentPosition();
  }

  async takePicture() {
    if(this.photos.length <= 5) {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
      this.photos.push(this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl)));
    } else {
      this.alertService.print('Vous pouvez uniquement ajouté 3 photos du produit', 'dark');
    }
  }

  delTof(index) {
    const tempPhotos: Array<SafeResourceUrl> = [];

    for (let i = 0; i < this.photos.length; i++) {
      if (index !== i) {
        tempPhotos.push(this.photos[i]);
      }
    }
    this.photos = [];
    this.photos = tempPhotos;
  }

  save(form) {
    this.isLoading = true;
    const infosBrutes = form.value.type === 'other' ? form.value.informations : (form.value.type === 'cni' ? '' +
      'nomsCni = ' + form.value.nomsCni + '; ' +
      'naissanceCni = ' + form.value.naissanceCni + '; ' +
      'nomsPereCni = ' + form.value.nomsPereCni + '; ' +
      'nomsMereCni = ' + form.value.nomsMereCni + '; ' +
      'sexeCni = ' + form.value.sexeCni + '; ' +
      '' : (form.value.type === 'passport' ? '' +
      'nomsPassport = ' + form.value.nomsPassport + '; ' +
      'naissancePassport = ' + form.value.naissancePassport + '; ' +
      'dateDelivrancePassport = ' + form.value.dateDelivrancePassport + '; ' +
      'numeroPassport = ' + form.value.numeroPassport + '; ' +
      'sexePassport = ' + form.value.sexePassport + '; ' +
      '' : (form.value.type === 'steakers' ? form.value.idSteakers : form.value.informations)));

    const objet: Objet = new Objet(form.value.type === 'other' ? form.value.other : form.value.type, infosBrutes, this.typeOperation === 'findObjet' ? 'find' : form.value.etat, firebase.auth().currentUser.email);
    objet.localisation = this.typeOperation === 'findObjet' ? new GeoPoint(this.coordinates.coords.latitude, this.coordinates.coords.longitude) : null;

    objet.descriptionLieu = this.typeOperation === 'findObjet' ? form.value.descriptionLieu : '';

    this.apiService.addAllImageForAdresseId( firebase.auth().currentUser.email + '/objets/' + Math.floor(Math.random() * (99999 - 10001 + 1)) + 10001, this.photos).then(
      (docRef: string[]) => {
        objet.medias = docRef;

        this.objetService.ajouterObjet(objet).then(
          () => {
            this.navCtrl.back();
            this.alertService.print('L\'objet à été ajouter', 'dark');
            this.isLoading = false;
          },
          (error) => {
            this.alertService.print('Une erreur est survenue, veuillez reesayer', 'danger');
            this.isLoading = false;
          }
        );
      },
      () => {
        this.isLoading = false;
        this.alertService.print('Une erreur est survenue lors de l\'opération, veillez reesayer', 'danger');
      });
  }

}
