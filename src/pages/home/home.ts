import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  article: IArticle[];
  errorMessage: string = 'No results Found';
  public products = [];
  counter: number = 0;

  constructor(public navCtrl: NavController) {
	  /**
	  *get data from the service provider inside the constructor
	  *
	  */
    this._productService.getProducts()
      .subscribe(article => this.article = article,
      error => this.errorMessage = <any>error);


  }
  /**
 * @param infiniteScroll 
 * @example 
 * When the user scroll down, the data start to show up 10 by 10
 */
  doInfinite(infiniteScroll) {
    if (this.products.length < this.article.length) {
      this.counter = this.counter + 10;
      this.products.push.apply(this.products, this.article.slice(this.counter, this.counter + 10));
      var a = this.article.slice(this.counter, this.counter + 10)
      console.log('load data', a);
    }
    infiniteScroll.complete();
  }
  /**
  * Fired when entering a page, after it becomes the active page. it launch after ion view will enter
  */
  ionViewDidEnter() {
    this.products = this.article.slice(this.counter, 10);
  }

}
export interface IArticle {
  articleName: string;
  price: number;
}