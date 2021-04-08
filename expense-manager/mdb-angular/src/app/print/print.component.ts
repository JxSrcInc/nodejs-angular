import { Component, OnInit, Input } from '@angular/core';
import { Util } from '../model/util';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['../app.component.css']
})
export class PrintComponent implements OnInit {
  @Input()
  categoryInfo: [];

  constructor() { }

  ngOnInit() {
  }

  getInfo() {
    let info = [];
     let tSum = 0;
     let tLastSum = 0;
    console.log(this.categoryInfo)
    for (let i=0; i<this.categoryInfo.length; i++) {
      let cInfo = this.categoryInfo[i]
      console.log(cInfo.category)
      
         if(cInfo.category.indexOf('Vehical') < 0 && cInfo.category.indexOf('Categories') < 0 ) {
          let lastSum = cInfo.lastSum;
          let sum = cInfo.sum;
          info.push({'name':cInfo.category, 'sum':sum, 'lastSum': lastSum});
          tSum += sum
          tLastSum += lastSum
         }
      
      
    }
    info.splice(0,0,{'name':'All','sum':tSum,'lastSum':tLastSum})
    return info;
  }

}
