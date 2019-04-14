import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Category } from '../model/category';
import { Util } from '../model/util';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css', '../app.component.css']
})
export class ConfigComponent implements OnInit, AfterContentInit {

  @Input()
  categories: {};
  @Output() childDataChange = new EventEmitter<{}>();
  addConfig: string = '';
  selectedCategory: string;
  error: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    //    console.log(this.categories['Income'])
  }
  onKeyPress(event: any) {
    var KeyID = event.keyCode;
    console.log(event);
    console.log(event.key);

    if (event.key == 'Enter') {
//      this.change(this.addConfig);
    }
  }
  change() {
    const value = this.addConfig
    this.categories[value] = new Category([], value);
    this.categories = Util.sortCategories(this.categories);
    this.childDataChange.emit(this.categories);
    this.addConfig = '';
  }
  getInfo() {
    let info = [];
    for (var property in this.categories) {
      if (this.categories.hasOwnProperty(property)) {
        let count = this.categories[property].records.length;
        info.push({ 'name': property, 'count': count });
      }
    }
    //    console.log(info);
    return info;
  }
  // when user select category
  onClick(event: any) {
    this.selectedCategory = event.target.id;
  }
  delete() {
    if (window.confirm('Do you want to delete "' + this.selectedCategory + '" ?')) {
      if (this.categories[this.selectedCategory].records.length == 0) {
        // delete 
        this.error = undefined;
        delete this.categories[this.selectedCategory];
      } else {
        // error
        this.error = "Cannot delete " + this.selectedCategory;
      }
    }
  }
  create() {
    if (window.confirm('Do you want to change "' + this.categories[this.selectedCategory].name
      + '" to "' + this.selectedCategory + '" ?')) {

      }

  }
  enableDelete() {
    return this.addConfig.length == 0;
  }
}
