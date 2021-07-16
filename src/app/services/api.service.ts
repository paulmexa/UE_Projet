import { Injectable } from '@angular/core';
import {SafeResourceUrl} from "@angular/platform-browser";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async addImageForAdresseId(name: string, adresse: string, image: SafeResourceUrl ) {
    return new Promise((resolve, reject) => {
      if(image === '') {
        resolve('');
      } else {
        const imgStorageRef = firebase.storage().ref(adresse + '/' + name + '.png');
        const newPhoto: string = image.toString().substring(image.toString().indexOf('base64,') + 7, image.toString().indexOf('(see ') - 1);
        return imgStorageRef.putString(newPhoto, 'base64', {contentType: 'image/png'}).then(
          () => {
            return imgStorageRef.getDownloadURL().then(downloadUrl => {
              resolve(downloadUrl);
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  async addAllImageForAdresseId(adresse: string, images: SafeResourceUrl[]) {
    const appel = this;
    return new Promise((resolve, reject) => {
      const resultats: string[] = [];
      if (images.length === 0) {
        resolve(resultats);
      } else {
        images.forEach(function(image, index) {
          appel.addImageForAdresseId(index.toString(), adresse, image).then(
            (downloadUrl: string) => {
              resultats.push(downloadUrl);
              if (resultats.length === images.length) {
                resolve(resultats);
              }
            }
          );
        });
      }
    });
  }
}
