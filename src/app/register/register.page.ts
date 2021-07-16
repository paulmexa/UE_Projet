import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Utilisateur } from '../models/utilisateur';
import { AlertService } from '../services/alert.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private isLoading = false;

  constructor(private alertService: AlertService, private authService: AuthentificationService, private navCtrl: NavController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  inscription(form) {

    this.present();

    const user: Utilisateur = new Utilisateur(form.value.nom.toLocaleLowerCase(), form.value.prenom.toLocaleLowerCase(), form.value.email.toLocaleLowerCase(), form.value.telephone)

    this.authService.signUpUser(user, form.value.password).then(
        () => {
          this.dismiss();
          this.navCtrl.navigateForward('tabs');
        },
        (error) => {
          this.dismiss();
          if (error.toString().search('another') > -1)
            this.alertService.print('Cette adresse email est deja utilisée, veillez choisir une autre adresse email', 'danger');
          else if (error.toString().search('formatted') > -1)
            this.alertService.print('Adresse email invalide. Veillez reesayer', 'danger');
          else if (error.toString().search('should') > -1)
            this.alertService.print('Votre mot de passe doit avoir minimum 6 caracteres', 'danger');
          else
            this.alertService.print('Une erreur est survenue, veillez reesayer plutard', 'danger');
        }
    );
  }

  /* Animation */
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Veillez patienter...',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

}
