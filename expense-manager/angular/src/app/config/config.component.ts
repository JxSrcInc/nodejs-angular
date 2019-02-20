import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Category } from '../model/category';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, AfterContentInit{

  @Input()
  categories: {};
  @Output() childDataChange = new EventEmitter<{}>();
  addConfig: string;
  selectedCategory: string;
  error: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(this.categories['Income'].records)
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
    this.addConfig = '';
  }
  getInfo() {
    let info = [];
    for (var property in this.categories) {
      if (this.categories.hasOwnProperty(property)) {
          let count = this.categories[property].records.length;
          info.push({'name':property, 'count': count});
      }
    }
//    console.log(info);
    return info;
  }
  onClick(event: any) {
//    console.log(event.target.id);
    this.selectedCategory = event.target.id;
  }
  delete() {
    console.log(this.selectedCategory);
    if(this.categories[this.selectedCategory].records.length == 0) {
      // delete 
      this.error = undefined;
      delete this.categories[this.selectedCategory];
    } else {
      // error
      this.error = "Cannot delete "+this.selectedCategory;
    }
  }
}
