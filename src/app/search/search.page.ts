import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Objet} from '../models/objet';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  isLoading = false;
  recupTerme = '';
  resultat: Objet[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.terme !== 'none') {
        this.recupTerme = params.terme;
        this.search();
      }
    });
  }

  search() {
    if (this.recupTerme !== ''){
      this.isLoading = true;
      // console.log(this.recupTerme);
    } else {
      this.resultat = [];
      this.isLoading = false;
    }
  }

}
