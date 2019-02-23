import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss','../app.component.css']
})
export class SummaryComponent implements OnInit {
  @Input()
  categories: {};

  constructor() { }

  ngOnInit() {
  }

  getInfo() {
    let info = [];
    for (let property in this.categories) {
      if (this.categories.hasOwnProperty(property)) {
        console.log(this.categories[property])
          let count = this.categories[property].getCount();
          let sum = this.categories[property].getSum();
          info.push({'name':property, 'sum':sum, 'count': count});
      }
    }
    console.log(info);
    return info;
  }

}
