import { Injectable } from '@angular/core';
import {Objet} from '../models/objet';
import firebase from 'firebase';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {

  db: any;

  constructor(private httpClient: HttpClient) { }

  async ajouterObjet(obj: Objet) {
    const tempId = Date.now();
    obj.id = tempId.toString();
    return new Promise<void>((resolve, reject) => {
      this.db = firebase.firestore().collection('objets').doc(tempId.toString()).set(Object.assign({}, obj)).then(
        () => {
          // Envoie sur serveur externe
          this.httpClient
            .post<any[]>('http://localhost:3000/api/stuff',
              {
                id: tempId.toString(),
                type: obj.type,
                nomsPassport: obj.type === 'passport' ? obj.identifications.split('nomsPassport = ')[1].split(';')[0] : '',
                naissancePassport: obj.type === 'passport' ? obj.identifications.split('naissancePassport = ')[1].split(';')[0] : '',
                dateDelivrancePassport: obj.type === 'passport' ? obj.identifications.split('dateDelivrancePassport = ')[1].split(';')[0] : '',
                numeroPassport: obj.type === 'passport' ? obj.identifications.split('numeroPassport = ')[1].split(';')[0] : '',
                sexePassport: obj.type === 'passport' ? obj.identifications.split('sexePassport = ')[1].split(';')[0] : '',
                nomsCni: obj.type === 'cni' ? obj.identifications.split('nomsCni = ')[1].split(';')[0] : '',
                naissanceCni: obj.type === 'cni' ? obj.identifications.split('naissanceCni = ')[1].split(';')[0] : '',
                nomsPereCni: obj.type === 'cni' ? obj.identifications.split('nomsPereCni = ')[1].split(';')[0] : '',
                nomsMereCni: obj.type === 'cni' ? obj.identifications.split('nomsMereCni = ')[1].split(';')[0] : '',
                sexeCni: obj.type === 'cni' ? obj.identifications.split('sexeCni = ')[1].split(';')[0] : '',
                identifications: obj.identifications,
                descriptionLieu: obj.descriptionLieu,
                operation: 'save'
              })
            .subscribe(
              (response) => {
                resolve(response as any);
              },
              (error) => {
                reject(error);
              }
            );

          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
