import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }

    async isAuthenticated() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    async signUpUser(user: Utilisateur, password: string) {
        return new Promise<void>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(user.email, password).then(
                () => {
                    firebase.firestore().collection('comptes').doc(user.email).set(Object.assign({}, user)).then(
                        () => {
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async resetPassword(email: string) {
        return new Promise<void>((resolve, reject) => {
            firebase.auth().sendPasswordResetEmail(email).then(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    signInUser(email: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async signOut() {
        return new Promise<void>((resolve, reject) => {
            firebase.auth().signOut().then(
                () => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}
