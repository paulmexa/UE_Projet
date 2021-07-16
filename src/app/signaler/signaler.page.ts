import {Component, OnChanges, OnInit} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-signaler',
  templateUrl: './signaler.page.html',
  styleUrls: ['./signaler.page.scss'],
})
export class SignalerPage implements OnInit {

  isLoading = false;
  coordinates: any = null;

  constructor() { }

  ngOnInit() { // état sera à find parmi les propriétés de l'objet
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    this.coordinates = await Geolocation.getCurrentPosition();
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
    });
  }

  signaler(form) {

  }

}
