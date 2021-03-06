import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private isLoading = false;

  constructor(private alertService: AlertService, private navCtrl: NavController, private loadingController: LoadingController, private alertController: AlertController, private authService: AuthentificationService) { }

  ngOnInit() {
  }

  connexion(form) {

    this.present();

    this.authService.signInUser(form.value.identifiant, form.value.password).then(
        () => {
          this.dismiss();
          this.navCtrl.navigateForward('tabs');
        },
        (error) => {
          if (error.toString().search('formatted') > -1)
            this.alertService.print('Adresse email invalide. Veillez reesayer', 'danger');
          else if (error.toString().search('no user') > -1)
            this.alertService.print('Identifiant ou mot de passe invalide. Veillez reesayer', 'danger');
          else
            this.alertService.print('Une erreur est survenue, veillez reesayer plutard', 'danger');
          this.dismiss();
        }
    );
  }

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

  async presentResetPassword() {
    const alert = await this.alertController.create({
      header: 'Mot de passe oublié ?',
      message: 'Entrez l\'adresse email de votre compte. Nous enverrons un email à cette adresse.',
      inputs: [
        {
          name: 'emailRecup',
          type: 'text',
          placeholder: 'Email'
        }],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Réinitialiser',
          handler: (data) => {
            return new Promise((resolve, reject) => {
              this.authService.resetPassword(data.emailRecup).then(
                  () => {
                    this.dismiss();
                    // this.notification('Les informations de reinitialisation ont été envoyer a votre adresse email', 'dark');
                  },
                  (error) => {
                    if (error.toString().search('formatted') > -1)
                      this.alertService.print('Adresse email invalide. Veillez reesayer', 'danger');
                    else if (error.toString().search('no user') > -1)
                      this.alertService.print('Adresse email invalide. Veillez reesayer', 'danger');
                    else
                      this.alertService.print('Une erreur est survenue, veillez reesayer plutard', 'danger');
                    this.dismiss();
                  }
              );
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
