import { Component, OnInit, Input } from '@angular/core';
import { Util } from '../model/util';

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
    let tCount = 0;
    let tSum = 0;
    for (let property in this.categories) {
      if (this.categories.hasOwnProperty(property)) {
          let count = this.categories[property].records.length;
          let sum = Util.getSum(this.categories[property].records);
//          if(sum != 0) {
          info.push({'name':property, 'sum':sum, 'count': count});
          tCount += count;
          tSum += sum
//          }
      }
    }
    info.splice(0,0,{'name':'All','sum':tSum,'count':tCount})
    console.log(info);
    return info;
  }

}
