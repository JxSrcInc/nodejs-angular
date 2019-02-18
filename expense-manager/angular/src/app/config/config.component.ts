import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../category';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  @Input()
  categories: {};
  @Output() childDataChange = new EventEmitter<{}>();
  addConfig: string;
  constructor() { }

  ngOnInit() {
  }

  onKeyPress(event: any) {
    console.log(event.key);
    if(event.key == 'Enter') {
      this.change(this.addConfig);
    }
  }
  change(value: string) {
    this.categories[value] = new Category([], value);
    console.log(this.categories);
    this.childDataChange.emit(this.categories);
  }
  getNames() {
    let names = Object.getOwnPropertyNames(this.categories);
    return names;
  }
}
